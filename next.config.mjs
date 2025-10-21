const isDev = process.env.NODE_ENV === 'development';

/** @type {import("next").NextConfig} */
const config = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: process.env.CF_PAGES ? undefined : "export",
  distDir: process.env.CF_PAGES ? ".vercel/output/static" : "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["localhost"],
  }
};

export default config;
