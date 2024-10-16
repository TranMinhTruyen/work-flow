/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Bỏ qua kiểm tra ESLint khi build
  },
  typescript: {
    ignoreBuildErrors: true, // Bỏ qua kiểm tra kiểu khi build
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
