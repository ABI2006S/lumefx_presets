import { NextResponse } from 'next/server';
import { getOrderById, getProductById } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: { orderId: string } }
) {
    try {
        const orderId = params.orderId;

        // 1. Fetch the order
        const order = await getOrderById(orderId);
        
        if (!order) {
            return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
        }
            
        // 2. Check if payment is successful
        if (order.payment_status !== 'success') {
            return NextResponse.json({
                error: 'Payment is not complete.',
                status: order.payment_status,
                message: `Please complete your payment before downloading. Current status: ${order.payment_status}`
            }, { status: 403 });
        }
            
        // 3. Get product details for the download link
        const productId = order.product_id;
        const product = await getProductById(productId);
        
        if (!product) {
            return NextResponse.json({ error: 'Product associated with this order was not found.' }, { status: 404 });
        }
            
        const driveLink = product.drive_link;
        if (!driveLink) {
            return NextResponse.json({ error: 'Download link is missing for this product.' }, { status: 404 });
        }
            
        // 4. Return the download link
        return NextResponse.json({
            success: true,
            download_url: driveLink,
            product_name: product.product_name
        });

    } catch (error: any) {
        console.error('Error in /api/download:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
