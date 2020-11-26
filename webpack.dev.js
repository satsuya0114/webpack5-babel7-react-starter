const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
 

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
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
});