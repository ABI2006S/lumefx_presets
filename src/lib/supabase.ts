import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('Missing SUPABASE_URL or SUPABASE_SERVICE_KEY');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function getProductById(productId: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error fetching product:', error);
    return null;
  }
}

export async function createOrder(orderData: {
  name: string;
  email: string;
  dream: string;
  state: string;
  product_id: string;
  product_price: number;
  razorpay_order_id: string;
}) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          ...orderData,
          payment_status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error creating order:', error);
    return null;
  }
}

export async function updateOrderStatus(
  razorpayOrderId: string,
  status: 'success' | 'failed' | 'pending',
  razorpayPaymentId?: string
) {
  try {
    const updateData: any = { payment_status: status };
    if (razorpayPaymentId) {
      updateData.razorpay_payment_id = razorpayPaymentId;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('razorpay_order_id', razorpayOrderId)
      .select()
      .single();

    if (error) {
      console.error('Error updating order status:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error updating order status:', error);
    return null;
  }
}

export async function incrementSalesCount(productId: string) {
  try {
    // We can't easily do increment in one go with JS client without RPC sometimes, 
    // but the python logic did fetch then update. Let's do the same for consistency 
    // or use a better way if possible.
    const product = await getProductById(productId);
    if (!product) return null;

    const currentCount = product.sales_count || 0;
    const { data, error } = await supabase
      .from('products')
      .update({ sales_count: currentCount + 1 })
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      console.error('Error incrementing sales count:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error incrementing sales count:', error);
    return null;
  }
}

export async function getOrderByRazorpayOrderId(razorpayOrderId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpayOrderId)
      .single();

    if (error) {
      console.error('Error fetching order by razorpay id:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error fetching order by razorpay id:', error);
    return null;
  }
}

export async function getOrderById(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('Error fetching order by id:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error fetching order by id:', error);
    return null;
  }
}
