import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_KEY || ''
);

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Validate required fields
        const requiredFields = ['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature'];
        for (const field of requiredFields) {
            if (!data[field]) {
                return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
            }
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

        // 1. Verify Razorpay signature using HMAC-SHA256
        const secret = process.env.RAZORPAY_KEY_SECRET || '';
        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const expectedSignature = shasum.digest('hex');

        const isValid = expectedSignature === razorpay_signature;

        if (!isValid) {
            // Mark order as failed in Supabase
            await supabase
                .from('orders')
                .update({ payment_status: 'failed', razorpay_payment_id })
                .eq('razorpay_order_id', razorpay_order_id);

            return NextResponse.json({ error: 'Payment verification failed', verified: false }, { status: 400 });
        }

        // 2. Update order status to success in Supabase
        const { data: updatedOrders } = await supabase
            .from('orders')
            .update({ payment_status: 'success', razorpay_payment_id })
            .eq('razorpay_order_id', razorpay_order_id)
            .select();

        let order = updatedOrders?.[0];

        // Fallback: re-fetch order if update didn't return data
        if (!order) {
            const { data: fetchedOrders } = await supabase
                .from('orders')
                .select('*')
                .eq('razorpay_order_id', razorpay_order_id);
            order = fetchedOrders?.[0];
        }

        if (!order) {
            return NextResponse.json({ error: 'Order not found in DB' }, { status: 404 });
        }

        const productId = order.product_id;
        const userEmail = order.email;
        const userName = order.name;

        // 3. Increment sales count
        if (productId) {
            const { data: products } = await supabase
                .from('products')
                .select('sales_count')
                .eq('id', productId);

            if (products?.[0]) {
                const currentCount = products[0].sales_count || 0;
                await supabase
                    .from('products')
                    .update({ sales_count: currentCount + 1 })
                    .eq('id', productId);
            }
        }

        // 4. Fetch product details for email
        const { data: productData } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId);

        const product = productData?.[0];
        if (!product) {
            return NextResponse.json({ error: 'Product details not found' }, { status: 404 });
        }

        const driveLink = product.drive_link;
        const productName = product.product_name;

        // 5. Send download email using Resend
        try {
            const { Resend } = await import('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);
            const fromEmail = process.env.RESEND_FROM_EMAIL || 'lumefxpresets@gmail.com';

            await resend.emails.send({
                from: `Editor Packs <${fromEmail}>`,
                to: [userEmail],
                subject: 'Your Editing Asset Pack is Ready',
                html: `
                    <p>Hi ${userName},</p>
                    <p>Thank you for purchasing our editing asset pack.</p>
                    <p>Download your files here:</p>
                    <p><a href="${driveLink}">${driveLink}</a></p>
                    <p>Enjoy creating amazing edits.</p>
                `,
            });
        } catch (emailErr) {
            console.error('Failed to send email:', emailErr);
            // Payment is still valid even if email fails
        }

        return NextResponse.json({
            message: 'Payment verified and email sent successfully',
            verified: true,
        });
    } catch (error) {
        console.error('Error in /api/verify-payment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
