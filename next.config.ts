import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true
      },
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true
      }

    ]
  }
};

export default nextConfig;
