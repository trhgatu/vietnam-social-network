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
    remotePatterns :[
      {
        protocol: "https",
        hostname: "avatar.iran.liara.run",
        pathname: "/public/**"
      }
    ]
  }
};

export default nextConfig;
