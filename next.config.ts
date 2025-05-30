import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here  imag */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',

      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',

      },
    ],
  },
};

export default nextConfig;
