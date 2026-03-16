import Razorpay from 'razorpay';

const keyId = process.env.RAZORPAY_KEY_ID || '';
const keySecret = process.env.RAZORPAY_SECRET || '';

if (!keyId || !keySecret) {
  console.warn('Missing RAZORPAY_KEY_ID or RAZORPAY_SECRET');
}

export const razorpayClient = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function createRazorpayOrder(amount: number, receipt?: string) {
  const options = {
    amount: amount, // amount in the smallest currency unit (paise for INR)
    currency: 'INR',
    receipt: receipt,
  };

  try {
    const order = await razorpayClient.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
}

export function verifyPaymentSignature(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', keySecret);
  hmac.update(razorpayOrderId + '|' + razorpayPaymentId);
  const generatedSignature = hmac.digest('hex');
  return generatedSignature === razorpaySignature;
}
