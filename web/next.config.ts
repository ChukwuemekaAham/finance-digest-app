import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows any hostname
      },
      // {
      //   protocol: 'https',
      //   hostname: 'image.cnbcfm.com',
      //   port: '',
      //   pathname: '/api/v1/image/**',
      // },
    ],
  },
  /* other config options here */
};

export default nextConfig;
