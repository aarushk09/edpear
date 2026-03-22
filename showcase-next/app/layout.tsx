import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { SiteHeader } from "../components/site-header";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EdPear — Component showcase",
  description: "Per-component previews of EdPear React components for Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sans.variable} h-dvh overflow-hidden font-sans antialiased`}
        suppressHydrationWarning
      >
        <Script id="showcase-default-dark" strategy="beforeInteractive">
          {`document.documentElement.classList.add("dark");`}
        </Script>
        <div className="showcase-app-shell flex h-dvh flex-col overflow-hidden text-foreground">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
