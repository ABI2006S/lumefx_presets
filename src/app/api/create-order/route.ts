import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || '',
    key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || ''
);

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields
        const requiredFields = ['name', 'email', 'dream', 'state', 'product_id'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
            }
        }

        const { name, email, dream, state, product_id } = data;

        // Fetch product from Supabase to get the latest dynamic price
        const { data: products, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('id', product_id);

        if (productError || !products || products.length === 0) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const product = products[0];

        // Check if product is active
        if (product.is_active === false) {
            return NextResponse.json({ error: 'Product is currently inactive and cannot be purchased' }, { status: 400 });
        }

        const priceInInr = product.price || 0;
        const amountInPaise = Math.round(priceInInr * 100);

        // Handle free products automatically without Razorpay
        if (amountInPaise === 0) {
            const freeOrderId = `free_${uuidv4().replace(/-/g, '')}`;

            // Create order in Supabase
            await supabase.from('orders').insert({
                name,
                email,
                dream,
                state,
                product_id,
                product_price: 0,
                razorpay_order_id: freeOrderId,
                payment_status: 'pending',
            });

            // Mark as success
            await supabase
                .from('orders')
                .update({ payment_status: 'success', razorpay_payment_id: 'free_transaction' })
                .eq('razorpay_order_id', freeOrderId);

            // Increment sales count
            const currentCount = product.sales_count || 0;
            await supabase
                .from('products')
                .update({ sales_count: currentCount + 1 })
                .eq('id', product_id);

            // Send download email
            try {
                const { Resend } = await import('resend');
                const resend = new Resend(process.env.RESEND_API_KEY);
                const fromEmail = process.env.RESEND_FROM_EMAIL || 'lumefxpresets@gmail.com';

                await resend.emails.send({
                    from: `Editor Packs <${fromEmail}>`,
                    to: [email],
                    subject: 'Your Editing Asset Pack is Ready',
                    html: `
                        <p>Hi ${name},</p>
                        <p>Thank you for purchasing our editing asset pack.</p>
                        <p>Download your files here:</p>
                        <p><a href="${product.drive_link}">${product.drive_link}</a></p>
                        <p>Enjoy creating amazing edits.</p>
                    `,
                });
            } catch (emailErr) {
                console.error('Failed to send email:', emailErr);
            }

            return NextResponse.json({
                order_id: freeOrderId,
                amount: 0,
                currency: 'INR',
                is_free: true,
                message: 'Free order processed successfully. Email sent!',
            });
        }

        // Create Razorpay order for paid products
        const receiptId = `rcpt_${uuidv4().replace(/-/g, '')}`;
        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: 'INR',
            receipt: receiptId,
            payment_capture: true,
        });

        if (!razorpayOrder.id) {
            return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
        }

        // Insert order in Supabase with status "pending"
        const { error: insertError } = await supabase.from('orders').insert({
            name,
            email,
            dream,
            state,
            product_id,
            product_price: priceInInr,
            razorpay_order_id: razorpayOrder.id,
            payment_status: 'pending',
        });

        if (insertError) {
            console.error('Failed to store order:', insertError);
            return NextResponse.json({ error: 'Failed to store order details in database' }, { status: 500 });
        }

        // Return Razorpay order details to frontend
        return NextResponse.json({
            order_id: razorpayOrder.id,
            amount: amountInPaise,
            currency: 'INR',
            is_free: false,
        });
    } catch (error) {
        console.error('Error in /api/create-order:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
