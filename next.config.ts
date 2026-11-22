import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The /zamoog story site is the home page. The URL stays "/"; /zamoog still works too.
  async rewrites() {
    return { beforeFiles: [
        { source: "/", destination: "/zamoog" },
        { source: "/see-what-works", destination: "/zamoog/see-what-works" },
      ], afterFiles: [], fallback: [] };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.simpleicons.org",
      },
    ],
  },
};

export default nextConfig;
