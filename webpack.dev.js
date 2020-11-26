const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
 

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot: true,
    open: true,
    // avoid to go to the local dict
    // when use react-router-dom browserRouter ( html 5 api ) should add this item
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    // proxy: {
    //   '/api': {
    //     changeOrigin: true,
    //     target: process.env.HOST_URL + process.env.CONTEXT_PATH,
    //     secure: false,
    //   },
    // },
  },
  // Note that webpack.HotModuleReplacementPlugin is required to fully enable HMR. If webpack or webpack-dev-server are launched with the --hot option, this plugin will be added automatically, so you may not need to add this to your webpack.config.js. See the HMR concepts page for more information.
  // refern: https://webpack.js.org/configuration/dev-server/
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // https://github.com/pmmmwh/react-refresh-webpack-plugin
    new ReactRefreshWebpackPlugin()
  ],
});