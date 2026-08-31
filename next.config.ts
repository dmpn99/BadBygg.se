import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tillåter att sajten öppnas från mobilen på det lokala nätverket under utveckling.
  allowedDevOrigins: ["172.20.10.2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
