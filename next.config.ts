import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/blog", destination: "/commits", permanent: true },
      { source: "/blog/:slug", destination: "/commits/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
