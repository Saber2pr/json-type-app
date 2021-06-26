const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require("path")

const publicPath = (resourcePath, context) =>
  path.relative(path.dirname(resourcePath), context) + '/'

const cdn = '//cdn.jsdelivr.net/gh'
const username = 'saber2pr'
const repo = 'json-type-app'
const pages_branch = 'gh-pages'

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  output: {
    filename: '[name][hash].min.js',
    path: path.join(__dirname, "build"),
    publicPath: process.env.NODE_ENV === 'production' ? `${cdn}/${username}/${repo}@${pages_branch}/` : '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
      },
      {
        test: /\.(woff|svg|eot|ttf|png)$/,
        use: ['url-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath },
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath },
          },
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name][hash].css',
      chunkFilename: 'style.[id][hash].css',
    }),
  ],
  watchOptions: {
    aggregateTimeout: 1000,
    ignored: /node_modules|lib/
  }
}