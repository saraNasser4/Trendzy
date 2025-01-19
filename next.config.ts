import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // here
        hostname: "placehold.co"
      },
    ],
  },
};

export default nextConfig;
