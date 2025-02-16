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
        hostname: "avatar.iran.liara.run",
        pathname: "/public/**"
      },
      {
        protocol: "https",
        hostname : "picsum.photos",
        pathname: "/200/**"
      }
    ]
  }
};

export default nextConfig;
