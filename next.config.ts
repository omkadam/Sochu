/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd16ho1g3lqitul.cloudfront.net', // Your CloudFront domain
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
