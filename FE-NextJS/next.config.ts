import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import type { NextConfig } from 'next';
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    emotion: {
      sourceMap: true,
    },
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.ProgressPlugin());
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    config.optimization.minimizer.push(
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      })
    );
    config.optimization.minimizer.push(
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      })
    );
    return config;
  },
};

export default nextConfig;
