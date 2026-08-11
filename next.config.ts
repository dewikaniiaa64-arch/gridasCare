import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.0.140",
    "192.168.0.140:3000",
    "192.168.1.67",
    "192.168.1.67:3000",
    "localhost:3000",
  ],
};

export default nextConfig;