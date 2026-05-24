import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { AmbientBackground } from "@/components/AmbientBackground";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { SkipLink } from "@/components/SkipLink";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-bg text-text relative min-h-screen antialiased">
        <SkipLink />
        <AmbientBackground />
        <CursorSpotlight />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
