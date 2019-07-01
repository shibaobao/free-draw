const webpack = require('webpack');

module.exports = {
  entry: {
    FreeDraw: ['./src/index.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    inline: true,
    hot: true,
    host: '0.0.0.0',
    historyApiFallback: true,
    port: process.env.PORT || 8101
  }
};