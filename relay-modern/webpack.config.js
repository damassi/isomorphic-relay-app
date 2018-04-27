import 'dotenv/config'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import path from 'path'
import webpack from 'webpack'

const { NODE_ENV, PORT } = process.env

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    artworks: [
      'webpack-hot-middleware/client',
      './src/apps/artworks/client.js',
    ],
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`[App] Listening on http://localhost:${PORT} \n`],
      },
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        METAPHYSICS_BASE_URL: JSON.stringify(
          'https://metaphysics-staging.artsy.net'
        ),
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // webpack.optimize.LimitChunkCountPlugin // Prevent chunk output
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['src', 'node_modules'],
  },
}
