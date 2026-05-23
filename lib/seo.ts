import type { Metadata } from "next";
import { bio } from "@/data/bio";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://isaactillema.com";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${bio.name} — ${bio.role}`,
    template: `%s | ${bio.name}`,
  },
  description: bio.intro,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: bio.name,
    title: `${bio.name} — ${bio.role}`,
    description: bio.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: `${bio.name} — ${bio.role}`,
    description: bio.intro,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export { SITE_URL };
