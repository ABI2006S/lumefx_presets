import { NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, customerInfo } = body;

        const secret = process.env.RAZORPAY_KEY_SECRET || 'dummy_secret';

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const expectedSignature = shasum.digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        if (!isAuthentic) {
            return NextResponse.json({ success: false, message: 'Invalid signature' }, { status: 400 });
        }

        // Payment is valid, save user data if needed here...
        console.log('Customer purchased:', customerInfo);

        // Send Email Delivery
        const driveLink = process.env.GOOGLE_DRIVE_LINK || 'https://drive.google.com/example-link';

        const transporter = nodemailer.createTransport({
            service: 'gmail', // Standard configuration for demo, normally better to use App Passwords
            auth: {
                user: process.env.EMAIL_USER || 'example@gmail.com',
                pass: process.env.EMAIL_PASS || 'password',
            },
        });

        const mailOptions = {
            from: `"Lumefx Team" <${process.env.EMAIL_USER || 'example@gmail.com'}>`,
            to: customerInfo.email,
            subject: 'Your Lumefx Bundle Download',
            text: `Hi ${customerInfo.name},\n\nThank you for purchasing the Lumefx Ultimate Editing Bundle.\n\nDownload your files here:\n${driveLink}\n\nBundle size: 64GB\n\nEnjoy creating cinematic edits.\n\nLumefx Team`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } catch (e) {
            console.error('Error sending email:', e);
            // It's still a success for payment if email fails, but should be logged.
        }

        return NextResponse.json({ success: true, message: 'Payment verified successfully' });

    } catch (error) {
        console.error('Payment verification failed:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
