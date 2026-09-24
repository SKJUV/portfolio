import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/coursera_assets/**",
      },
      {
        protocol: "https",
        hostname: "images.credly.com",
      },
    ],
  },
};

export default nextConfig;
