const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const WebpackBar = require('webpackbar');
const path = require('path');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const sass = require('sass');

const isProductionMode = process.env.NODE_ENV === 'production';
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: isProductionMode ? 'js/[name].[contenthash].js' : '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'asstes/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        // test: /\.m?js$/,
        // test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: [
              ['module-resolver', {
                root: ['./src'],
                alias: {
                  '~': path.resolve(__dirname, './src'),
                  '~modules': path.resolve(__dirname, './src', 'modules'),
                },
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
              }],
              isDevelopment && require.resolve('react-refresh/babel'),
              // https://github.com/pmmmwh/react-refresh-webpack-plugin
            ].filter(Boolean),
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          isProductionMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProductionMode ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          } : 'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          isProductionMode ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          } : 'style-loader', // This plugin should be used only on production builds without style-loader in the loaders chain, especially if you want to have HMR in development.
          // Here is an example to have both HMR in development and your styles
          // extracted in a file for production builds.
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'icons/[hash][ext]',
        },
        use: 'svgo-loader',
      },
      {
        test: /\.txt/,
        type: 'asset', // inline or resource
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 4kb inline
          },
        },
        generator: { // resource
          filename: 'txt/[hash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: { // resource
          filename: 'fonts/[hash][ext]',
        },
      },
      {
        test: /\.toml$/i,
        type: 'json',
        parser: {
          parse: toml.parse,
        },
      },
      {
        test: /\.yaml$/i,
        type: 'json',
        parser: {
          parse: yaml.parse,
        },
      },
      {
        test: /\.json5$/i,
        type: 'json',
        parser: {
          parse: json5.parse,
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProductionMode ? 'css/[name].[contenthash].css' : '[name].[hash].css',
      chunkFilename: isProductionMode ? '[id].[contenthash].css' : '[id].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new BundleAnalyzerPlugin(),
    new WebpackBar(),
  ],
  optimization: {
    moduleIds: 'natural',
    splitChunks: {
      chunks: 'all',
      // use in big node_modules to caching file
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
