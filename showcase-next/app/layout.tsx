import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { SiteHeader } from "../components/site-header";
import { ThemeInitializer } from "../components/theme-initializer";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EdPear",
  description: "EdPear component showcase and documentation for next-generation EdTech products.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
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
        <ThemeInitializer />
        <div className="showcase-app-shell flex h-dvh flex-col overflow-hidden text-foreground">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
