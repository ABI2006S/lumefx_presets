import resend
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ.get("RESEND_API_KEY")

if API_KEY:
    resend.api_key = API_KEY
else:
    print("Warning: Missing RESEND_API_KEY environment variable")

def send_download_email(to_email, name, drive_link, product_name):
    try:
        subject = f"Your Editing Asset Pack is Ready"
        
        # HTML body formatted as requested
        body = f"""
        <p>Hi {name},</p>
        <p>Thank you for purchasing our editing asset pack.</p>
        <p>Download your files here:</p>
        <p><a href="{drive_link}">{drive_link}</a></p>
        <p>Enjoy creating amazing edits.</p>
        """
        
        # Custom from address requested by user
        # NOTE: This will only work if the domain (gmail.com) is verified in Resend (unlikely)
        from_email = os.environ.get("RESEND_FROM_EMAIL", "hello@lumefxpresets.store") 

        params = {
            "from": f"Editor Packs <{from_email}>",
            "to": [to_email],
            "subject": subject,
            "html": body,
        }

        email_response = resend.Emails.send(params)
        return email_response
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Failed to send email via Resend to {to_email}: {e}")
        return None
