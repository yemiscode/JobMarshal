import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "r4jdnj0q8e.ufs.sh",
        port: "",
      }
    ]
  }
};

export default nextConfig;
