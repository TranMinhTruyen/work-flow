const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = Boolean(env?.analyze);
  const envFile = isProduction ? '.env.production' : '.env.development';

  const config = {
    entry: {
      app: {
        import: path.join(__dirname, 'src', 'index.tsx'),
        dependOn: 'vendor',
      },
      vendor: ['react', 'react-dom', 'react-router-dom'],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
      clean: true,
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        assets: path.resolve(__dirname, 'src/assets/'),
        common: path.resolve(__dirname, 'src/common/'),
        components: path.resolve(__dirname, 'src/components/'),
        model: path.resolve(__dirname, 'src/model/'),
        pages: path.resolve(__dirname, 'src/pages/'),
      },
    },

    module: {
      rules: [
        // {
        //   test: /\.m?js$/,
        //   resolve: { fullySpecified: false },
        // },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.(css|scss)$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? 'static/css/[name].[contenthash:6].css' : '[name].css',
      }),

      new Dotenv({
        path: path.resolve(__dirname, envFile),
      }),

      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        filename: 'index.html',
      }),
    ],

    optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
      splitChunks: {
        chunks: 'all',
      },
    },

    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
    },

    devtool: isProduction ? false : 'source-map',
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
