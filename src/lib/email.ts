import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';

if (!resendApiKey) {
  console.warn('Missing RESEND_API_KEY');
}

export const resend = new Resend(resendApiKey);

export async function sendDownloadEmail(
  toEmail: string,
  name: string,
  driveLink: string,
  productName: string
) {
  try {
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'hello@lumefxpresets.store';
    
    const { data, error } = await resend.emails.send({
      from: `Editor Packs <${fromEmail}>`,
      to: [toEmail],
      subject: 'Your Editing Asset Pack is Ready',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for purchasing our editing asset pack: <strong>${productName}</strong>.</p>
        <p>Download your files here:</p>
        <p><a href="${driveLink}">${driveLink}</a></p>
        <p>Enjoy creating amazing edits.</p>
      `,
    });

    if (error) {
      console.error('Error sending email:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return null;
  }
}
