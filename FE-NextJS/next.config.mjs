/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.ProgressPlugin());
    return config;
  },
};

export default nextConfig;
