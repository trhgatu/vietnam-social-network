import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    domains: ["example.com", "picsum.photos", "your-api-domain.com"],
  },
};

export default nextConfig;
