import { NextResponse } from 'next/server';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { 
    updateOrderStatus, 
    getOrderByRazorpayOrderId, 
    getProductById, 
    incrementSalesCount 
} from '@/lib/supabase';
import { sendDownloadEmail } from '@/lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Verify Razorpay signature
        const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
        
        if (!isValid) {
            await updateOrderStatus(razorpay_order_id, 'failed', razorpay_payment_id);
            return NextResponse.json({ error: 'Payment verification failed', verified: false }, { status: 400 });
        }

        // 2. Update order in Supabase
        let order = await updateOrderStatus(razorpay_order_id, 'success', razorpay_payment_id);
        
        if (!order) {
            order = await getOrderByRazorpayOrderId(razorpay_order_id);
        }

        if (!order) {
            return NextResponse.json({ error: 'Order not found in DB' }, { status: 404 });
        }

        const { product_id, email, name } = order;

        // 3. Increase sales count
        if (product_id) {
            await incrementSalesCount(product_id);
        }

        // 4. Fetch the product drive link
        const product = await getProductById(product_id);
        if (!product) {
            return NextResponse.json({ error: 'Product details not found' }, { status: 404 });
        }

        // 5. Send email using Resend
        await sendDownloadEmail(
            email,
            name,
            product.drive_link,
            product.product_name
        );

        return NextResponse.json({
            message: 'Payment verified and email sent successfully',
            verified: true
        });

    } catch (error: any) {
        console.error('Error in /api/verify-payment:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
