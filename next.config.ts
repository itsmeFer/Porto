import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.2"],
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'cv.ferdinandsianturi.my.id',
          },
        ],
        destination: '/cv', // Kita arahkan semua trafik subdomain ini ke /cv
      },
    ];
  },
};

export default nextConfig;