import React from 'react';

export default function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center' }}>
                    <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                        <div className="footer-logo text-2xl font-bold tracking-tight text-foreground">
                            Lume<span className="text-accent-blue">fx</span>
                        </div>
                        <p className="footer-desc text-muted-foreground mt-2 max-w-sm">
                            Premium editing tools for modern video creators.
                        </p>
                    </div>
                    <div className="footer-links" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a href="mailto:support@lumefx.in" className="text-muted-foreground hover:text-foreground transition-colors">support@lumefx.in</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</a>
                        <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Copyright © {new Date().getFullYear()} Lumefx. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
