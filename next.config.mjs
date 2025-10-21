/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  distDir: 'out',
  // Ensure trailing slashes are handled consistently
  trailingSlash: true,
  // Specify allowed domains for images
  images: {
    domains: ['localhost'],
    unoptimized: true,
  }
}

export default nextConfig
