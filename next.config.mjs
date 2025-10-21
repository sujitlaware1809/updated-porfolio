const isDev = process.env.NODE_ENV === 'development';

/** @type {import("next").NextConfig} */
const config = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["localhost"],
  },
  // Ensure routes manifest is generated
  generateBuildId: async () => {
    return "build"
  }
};

export default config;
