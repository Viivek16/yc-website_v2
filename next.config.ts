import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
