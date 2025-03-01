const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = Boolean(env?.analyze);
  const envFile = isProduction ? '.env.production' : '.env.development';

  const config = {
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        assets: path.resolve(__dirname, 'src/assets/'),
        common: path.resolve(__dirname, 'src/common/'),
        components: path.resolve(__dirname, 'src/components/'),
        lib: path.resolve(__dirname, 'src/lib/'),
        locales: path.resolve(__dirname, 'src/locales/'),
        pages: path.resolve(__dirname, 'src/pages/'),
        services: path.resolve(__dirname, 'src/services/'),
      },
    },

    entry: {
      app: {
        import: path.join(__dirname, 'src', 'main.tsx'),
        dependOn: 'vendor',
      },
      vendor: ['react', 'react-dom', 'react-router-dom'],
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, 'tsconfig.app.json'),
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: !isProduction },
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: !isProduction },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          type: 'asset/resource',
          generator: {
            filename: isProduction
              ? 'static/media/[name].[contenthash:6][ext]'
              : '[path][name][ext]',
          },
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProduction ? 'static/fonts/[name].[ext]' : '[path][name].[ext]',
              },
            },
          ],
        },
      ],
    },

    target: 'web',

    performance: {
      maxAssetSize: 2 * 1024 * 1024,
      maxEntrypointSize: 2 * 1024 * 1024,
    },

    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },

    output: {
      filename: 'static/js/[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },

    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      static: {
        directory: path.resolve(__dirname, 'public'),
        watch: true,
      },
    },

    devtool: isProduction ? false : 'source-map',

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css',
      }),

      new Dotenv({
        path: path.resolve(__dirname, envFile),
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
      }),
    ],
  };

  if (isProduction) {
    config.plugins = [
      ...config.plugins,
      new webpack.ProgressPlugin(),
      new CompressionPlugin({
        test: /\.(css|js)$/,
        algorithm: 'brotliCompress',
      }),
      new CleanWebpackPlugin(),
    ];

    if (isAnalyze) {
      config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
    }

    config.optimization = {
      minimizer: [`...`, new CssMinimizerPlugin()],
    };
  }

  return config;
};
