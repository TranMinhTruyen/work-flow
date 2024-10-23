/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.ProgressPlugin());
    return config;
  },
};

export default nextConfig;
