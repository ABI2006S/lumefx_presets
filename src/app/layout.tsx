import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import BackgroundVideo from "@/components/BackgroundVideo";
import Script from "next/script";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LumeFX - Premium Creator Toolkit",
  description: "The ultimate creator toolkit including 200+ presets, 150+ LUTs, premium fonts, overlays, sound effects, and creator AI tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '26124813027186818');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${orbitron.variable} ${inter.variable}`}>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=26124813027186818&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <BackgroundVideo />
        {children}
      </body>
    </html>
  );
}
