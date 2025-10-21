const isDev = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: isDev ? undefined : 'export',
  distDir: isDev ? '.next' : 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['localhost'],
  },
};

export default nextConfig;
