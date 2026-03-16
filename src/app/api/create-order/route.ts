import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getProductById, createOrder, updateOrderStatus, incrementSalesCount } from '@/lib/supabase';
import { createRazorpayOrder } from '@/lib/razorpay';
import { sendDownloadEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, dream, state, product_id } = body;

        // 1. Validate data
        if (!name || !email || !dream || !state || !product_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 2. Fetch product from Supabase
        const product = await getProductById(product_id);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        if (product.is_active === false) {
            return NextResponse.json({ error: 'Product is currently inactive' }, { status: 400 });
        }

        const priceInInr = product.price || 0;
        const amountInPaise = Math.round(priceInInr * 100);

        // 3. Handle Free Products automatically
        if (amountInPaise === 0) {
            const freeOrderId = `free_${uuidv4().replace(/-/g, '')}`;
            
            const order = await createOrder({
                name,
                email,
                dream,
                state,
                product_id,
                product_price: 0,
                razorpay_order_id: freeOrderId
            });

            if (!order) {
                return NextResponse.json({ error: 'Failed to create free order' }, { status: 500 });
            }

            await updateOrderStatus(freeOrderId, 'success', 'free_transaction');
            await incrementSalesCount(product_id);
            
            await sendDownloadEmail(
                email,
                name,
                product.drive_link,
                product.product_name
            );
            
            return NextResponse.json({
                order_id: freeOrderId,
                amount: 0,
                currency: 'INR',
                is_free: true,
                message: 'Free order processed successfully. Email sent!'
            });
        }

        // 4. Create Razorpay order
        const receipt = `rcpt_${uuidv4().replace(/-/g, '')}`;
        const razorpayOrder = await createRazorpayOrder(amountInPaise, receipt);
        const razorpayOrderId = razorpayOrder.id;

        if (!razorpayOrderId) {
            return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
        }

        // 5. Insert order in Supabase
        const order = await createOrder({
            name,
            email,
            dream,
            state,
            product_id,
            product_price: priceInInr,
            razorpay_order_id: razorpayOrderId
        });

        if (!order) {
            return NextResponse.json({ error: 'Failed to store order in database' }, { status: 500 });
        }

        // 6. Return Razorpay order details to frontend
        return NextResponse.json({
            order_id: razorpayOrderId,
            amount: amountInPaise,
            currency: 'INR',
            is_free: false
        });

    } catch (error: any) {
        console.error('Error in /api/create-order:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
