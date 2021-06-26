const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanCSSPlugin = require('less-plugin-clean-css')
const path = require('path')

const extractLess = new ExtractTextPlugin('style.min.css')

const cdn = '//cdn.jsdelivr.net/gh'
const username = 'saber2pr'
const repo = 'json-type-app'
const pages_branch = 'gh-pages'

const {
  WebpackConfig,
  templateContent
} = require('@saber2pr/webpack-configer')

module.exports = WebpackConfig({
  mode: 'production',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, 'build'),
    publicPath: process.env.NODE_ENV === 'production' ? `${cdn}/${username}/${repo}@${pages_branch}/` : '/',
  },
  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: ['ts-loader']
    },
    {
      test: /\.(css|less)$/,
      use: extractLess.extract({
        use: [{
          loader: 'css-loader'
        },
        {
          loader: 'less-loader',
          options: {
            plugins: [
              new CleanCSSPlugin({
                advanced: true
              })
            ]
          }
        }
        ],
        fallback: 'style-loader'
      })
    }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    templateContent: templateContent('json to d.ts', {
      'injectBody': '<div id="root"></div>'
    })
  }), extractLess]
})