import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialRail } from "@/components/SocialRail";
import { EmailRail } from "@/components/EmailRail";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text min-h-screen antialiased">
        <a
          href="#main"
          className="bg-accent text-bg sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:px-3 focus:py-2 focus:font-mono focus:text-sm"
        >
          Skip to content
        </a>
        <Header />
        <SocialRail />
        <EmailRail />
        <main
          id="main"
          className="mx-auto w-full max-w-(--max-w-content) px-6 pt-(--header-h) md:px-12"
        >
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
