import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['remotion'],
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'videos.pexels.com',
      },
    ],
  },
}

export default nextConfig
