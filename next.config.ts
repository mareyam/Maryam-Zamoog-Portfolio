import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // zamoog.com and www.zamoog.com keep "/" as the /zamoog story (URL stays "/").
  // maryam.zamoog.com "/" serves /desktop the same way. The host rule is first:
  // a beforeFiles rewrite that resolves to a real page stops the chain.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          has: [{ type: "host", value: "maryam\\.zamoog\\.com" }],
          destination: "/desktop",
        },
        { source: "/", destination: "/zamoog" },
        { source: "/see-what-works", destination: "/zamoog/see-what-works" },
      ],
      afterFiles: [],
      fallback: [],
    };
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
