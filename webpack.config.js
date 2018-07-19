import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const DIR = {
  STYLE: 'css',
  IMAGE: 'images',
  OUTPUT: 'dist'
};

const INLINE_THRESHOLD = 1024;

const imageOptions = {
  limit: INLINE_THRESHOLD,
  name: `${DIR.IMAGE}/[name].[ext]`
};

const woffMime = {mimetype: 'application/font-woff'};

const extractTextPlugin = new ExtractTextPlugin({
  filename: `${DIR.STYLE}/main.css`
});

module.exports = {
  cache: true,
  entry: {
    main: ['babel-polyfill', './src/index.js']
  },
  output: {
    path: path.join(__dirname, DIR.OUTPUT),
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.s?css$/,
        use: extractTextPlugin.extract({
          use: [
            {loader: 'css-loader', options: {minimize: true}},
            {loader: 'sass-loader'}
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: imageOptions
      }
    ]
  },
  plugins: [
    extractTextPlugin,
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      hash: true,
      excludeChunks: ['es6-shim']
    })
  ]
};
