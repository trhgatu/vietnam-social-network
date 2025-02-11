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
  },
  images: {
    domains: ["avatar.iran.liara.run"],
  }
};

export default nextConfig;
