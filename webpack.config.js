const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const markdownLoader = path.resolve(__dirname, 'loaders', 'marked-loader.js');

const config = {
  entry: [
    './src/duxli.scss',
    // Tedious, but any markdown files need to be added here.
    // @todo FUTURE - Automatically determine all markdown files in source.
    './src/index.md',
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'demo.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateContent: ({ htmlWebpackPlugin }) =>
        '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' +
        htmlWebpackPlugin.options.title +
        '</title></head><body><div id="app"></div></body></html>',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'duxli.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: markdownLoader,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
};

module.exports = config;
