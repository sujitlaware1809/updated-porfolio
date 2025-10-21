/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Changed from 'export' to 'standalone' to support API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Configure server runtime
  serverRuntimeConfig: {
    // Will only be available on the server side
    NODE_ENV: process.env.NODE_ENV,
  },
  // Configure public runtime
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  }
}

export default nextConfig
