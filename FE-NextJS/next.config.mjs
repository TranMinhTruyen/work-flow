import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack, dev }) => {
    config.plugins.push(new webpack.ProgressPlugin());
    if (dev) {
      config.devtool = 'source-map';
    }
    config.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
        parallel: true,
      }),
    ];

    return config;
  },
};

export default nextConfig;
