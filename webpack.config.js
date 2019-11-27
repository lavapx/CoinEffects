const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/game.ts',
    vendors: ['phaser']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  devtool: 'inline-source-map',

  resolve: {
    extensions: [ '.ts', '.tsx', '.js' ]
  },

  output: {
    filename: 'game.bundle.js',
    path: path.resolve(__dirname, 'export/html5/out')
  },

  mode: 'development',

  devServer: {
    contentBase: path.resolve(__dirname, 'export/html5/out'),
    https: true
  },

  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'export/html5/template/index.html'),
        to: path.resolve(__dirname, 'export/html5/out')
      },
      {
        from: path.resolve(__dirname, 'assets', '**', '*'),
        to: path.resolve(__dirname, 'export/html5/out')
      }
    ]),
    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true)
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};