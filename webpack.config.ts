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

export interface ProcessEnv {
  [key: string]: any;
}

const config: webpack.Configuration = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

const plugins = [
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false,
  }),
  new HtmlWebpackPlugin({
    hash: true,
    inject: true,
    template: path.resolve(__dirname, 'src', 'index.html'),
    path: path.join(__dirname, '../dist/'),
    filename: 'index.html',
  }),
  new CopyWebpackPlugin([
    { from: 'src/assets/', to: 'assets' },
    { from: 'src/manifest.json', to: '' },
    { from: 'src/robots.txt', to: '' },
    { from: 'node_modules/ionicons/dist/ionicons/svg/', to: 'svg' },
  ]),
  new ProgressBarPlugin(),
  new DeckDeckGoMarkdownPlugin({
    src: path.resolve(__dirname, 'slides', 'fewd.md'),
  }),
];

const configuration = (
  env: ProcessEnv,
  mode: webpack.Configuration['mode'],
) => {
  if (mode === 'development') {
    config.devtool = 'source-map';
  }

  if (mode === 'production') {
    plugins.push(
      new GenerateSW({
        ignoreUrlParametersMatching: [/./],
      }),
    );
    plugins.push(new DeckDeckGoInfoPlugin());
  }

  config.plugins = plugins;

  if (env && env.local) {
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          SIGNALING_SERVER: JSON.stringify('http://localhost:3002'),
        },
      }),
    );
  }

  return config;
};

export default configuration;
