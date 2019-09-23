import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {
  DeckDeckGoInfoPlugin,
  DeckDeckGoMarkdownPlugin,
  // @ts-ignore
} from 'deckdeckgo-webpack-plugins';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
// @ts-ignore
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import webpack from 'webpack';
import { GenerateSW } from 'workbox-webpack-plugin';

const configuration: webpack.Configuration = {
  entry: path.resolve(__dirname, '../src', 'index.ts'),
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      hash: true,
      inject: true,
      template: path.resolve(__dirname, '../src', 'index.html'),
      path: path.join(__dirname, '../dist/'),
      filename: 'index.html',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/', to: 'assets' },
      { from: 'src/manifest.json', to: '' },
      { from: 'src/robots.txt', to: '' },
      { from: 'node_modules/ionicons/dist/ionicons/svg/', to: 'svg' },
    ]),
    new DeckDeckGoInfoPlugin(),
    new GenerateSW({
      ignoreUrlParametersMatching: [/./],
    }),
    new ProgressBarPlugin(),
    new DeckDeckGoMarkdownPlugin({
      src: path.resolve(__dirname, '../slides', 'fewd.md'),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default configuration;
