import React from 'react';
import Link from 'next/link';
import './success.css';

export default function SuccessPage() {
    return (
        <main className="success-container">
            <div className="success-card animate-fade-in">
                <div className="success-icon">🎉</div>
                <h1 className="success-title">Payment Successful</h1>
                <p className="success-message">
                    Thank you for purchasing Lumefx Bundle.<br />
                    Your download link has been sent to your email.
                </p>

                <div className="success-details">
                    <p><strong>Note:</strong> Please check your spam folder if you don&apos;t see the email within 5 minutes.</p>
                </div>

                <Link href="/" className="btn-primary mt-4">
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
