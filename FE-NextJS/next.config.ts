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
  experimental: {
    turbo: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.cjs', '.json'],
    },
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.ProgressPlugin());
    config.config.optimization.minimizer.push([
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
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
      }),
    ]);

    return config;
  },
};

export default nextConfig;
