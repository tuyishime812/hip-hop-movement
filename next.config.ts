import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable typed routes for better type safety
  typedRoutes: true,
  // Enable turbopack root detection to silence warnings
  turbopack: {
    root: '.',
  },
};

export default nextConfig;
