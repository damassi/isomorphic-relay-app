import 'dotenv/config'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import path from 'path'
import webpack from 'webpack'
import { ReactLoadablePlugin } from 'react-loadable/webpack'

const { NODE_ENV, PORT } = process.env

export default {
  devtool: 'cheap-module-eval-source-map',
  mode: NODE_ENV,

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
      // See: https://github.com/aws/aws-amplify/issues/686#issuecomment-387710340
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        include: /src/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  // See https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366 and
  // https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'manifest',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`[App] Listening on http://localhost:${PORT} \n`],
      },
    }),
    new ProgressBarPlugin(),
    new ReactLoadablePlugin({
      filename: './public/assets/react-loadable.json',
    }),
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
    extensions: ['.mjs', '.js', '.jsx', '.json'],
    modules: ['src', 'node_modules'],
  },
}
