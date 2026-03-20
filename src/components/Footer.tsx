import React from 'react';
import Image from 'next/image';

/* ── SVG Icons ── */
const GmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Z" fill="transparent" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M2 6l10 7 10-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 1.9.53 3.67 1.45 5.18L2 22l4.96-1.42A9.96 9.96 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm-1.28 5.96c-.22-.5-.45-.51-.66-.52H9.5c-.22 0-.57.08-.87.4-.3.32-1.14 1.11-1.14 2.71s1.17 3.14 1.33 3.36c.17.22 2.24 3.56 5.5 4.85 2.72 1.07 3.27.86 3.86.81.59-.06 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.14-.3-.22-.62-.38-.33-.16-1.9-.94-2.2-1.04-.3-.11-.52-.16-.74.16-.22.33-.84 1.04-1.03 1.26-.19.22-.38.24-.71.08-.33-.16-1.4-.52-2.67-1.64-1-.9-1.67-2-1.86-2.33-.2-.33-.02-.51.14-.67.14-.14.33-.38.49-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.57-.09-.16-.73-1.78-.98-2.41Z"
      fill="currentColor"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-section {
          padding: 4rem 0 2rem;
          background: transparent;
          border-top: 1px solid rgba(255,255,255,0.07);
        }

        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .footer-desc {
          font-size: 0.95rem;
          color: var(--muted-foreground);
          max-width: 360px;
          line-height: 1.6;
          margin-top: 0.5rem;
        }

        /* Social icon row */
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-icon-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 100px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.75);
          font-size: 0.8rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.18s;
          white-space: nowrap;
        }

        .footer-icon-link:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.28);
          color: #fff;
          transform: translateY(-2px);
        }

        /* Platform-specific hover tints */
        .footer-icon-link.gmail:hover    { border-color: rgba(234,67,53,0.5);  background: rgba(234,67,53,0.1);  }
        .footer-icon-link.instagram:hover{ border-color: rgba(225,48,108,0.5); background: rgba(225,48,108,0.1); }
        .footer-icon-link.whatsapp:hover { border-color: rgba(37,211,102,0.5); background: rgba(37,211,102,0.1); color: #25d366; }

        /* Text-only links (Terms, Privacy) */
        .footer-doc-links {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-doc-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          color: rgba(255,255,255,0.45);
          font-size: 0.78rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-doc-link:hover {
          color: rgba(255,255,255,0.9);
        }

        .footer-doc-link svg {
          flex-shrink: 0;
          opacity: 0.6;
        }

        .footer-divider {
          width: 1px;
          height: 14px;
          background: rgba(255,255,255,0.15);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 1.5rem;
          text-align: center;
          color: var(--muted-foreground);
          font-size: 0.8rem;
        }

        @media (max-width: 480px) {
          .footer-socials {
            gap: 0.5rem;
          }
          .footer-icon-link {
            font-size: 0.75rem;
            padding: 0.45rem 0.85rem;
          }
        }
      `}</style>

      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">

            {/* Logo + tagline */}
            <div className="footer-brand">
              <Image
                src="/logo.jpeg"
                alt="LumeFX Logo"
                width={72}
                height={72}
                className="logo-img"
                style={{ mixBlendMode: 'screen' }}
              />
              <p className="footer-desc">
                Premium editing tools for modern video creators.
              </p>
            </div>

            {/* Social icon pills */}
            <div className="footer-socials">
              <a
                href="mailto:hello@lumefxpresets.store"
                className="footer-icon-link gmail"
                title="hello@lumefxpresets.store"
              >
                <GmailIcon />
                hello@lumefxpresets.store
              </a>

              <a
                href="https://www.instagram.com/lumefx.presets/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link instagram"
                title="Follow on Instagram"
              >
                <InstagramIcon />
                lumefx.presets
              </a>

              <a
                href="https://wa.me/919446600532"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link whatsapp"
                title="+91 94466 00532"
              >
                <WhatsAppIcon />
                +91 94466 00532
              </a>
            </div>

            {/* Policy links */}
            <div className="footer-doc-links">
              <a href="/terms-and-conditions" className="footer-doc-link">
                <DocumentIcon />
                Terms &amp; Conditions
              </a>
              <span className="footer-divider" aria-hidden="true" />
              <a href="/privacy-policy" className="footer-doc-link">
                <DocumentIcon />
                Privacy Policy
              </a>
              <span className="footer-divider" aria-hidden="true" />
              <a href="/refund-policy" className="footer-doc-link">
                <DocumentIcon />
                Refund Policy
              </a>
            </div>

          </div>

          <div className="footer-bottom">
            <p>Copyright © {new Date().getFullYear()} Lumefx. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
