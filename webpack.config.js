const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'client/index.jsx'),
  mode: process.env.NODE_ENV,
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'client'),
      publicPath: '/build/bundle.js',
    },
    proxy: {
      '/drinks': 'http://localhost:3000',
    },
    port: 8080,
    magicHtml: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        // https://webpack.js.org/loaders/babel-loader/
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.scss/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
