import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
      },
    ],
  },

  async redirects() {
    // All hosts redirect straight to the non-www canonical to avoid
    // www.4o4solutions.com → www.watad-solutions.com → watad-solutions.com chains.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.watad-solutions.com" }],
        destination: "https://watad-solutions.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "4o4solutions.com" }],
        destination: "https://watad-solutions.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.4o4solutions.com" }],
        destination: "https://watad-solutions.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
