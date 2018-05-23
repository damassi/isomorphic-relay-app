// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import 'dotenv/config'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import path from 'path'
import webpack from 'webpack'

const {
  NODE_ENV,
  PORT,
  SSR_ENABLED,
  WEBPACK_DEVTOOL = 'cheap-module-eval-source-map',
} = process.env

export default {
  devtool: WEBPACK_DEVTOOL, // source-map
  mode: NODE_ENV,
  entry: {
    artworks: [
      'webpack-hot-middleware/client?reload=true',
      './src/apps/artworks/client.js',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets',
  },
  module: {
    rules: [
      // See: https://github.com/aws/aws-amplify/issues/686#issuecomment-387710340
      {
        test: /\.mjs$/,
        include: /node_modules\/react-relay-network-modern/,
        type: 'javascript/auto',
      },
      {
        test: /(\.(js|ts)x?$)/,
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
      chunks: 'all',
      name: 'manifest',
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
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
        SSR_ENABLED: JSON.stringify(SSR_ENABLED),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // webpack.optimize.LimitChunkCountPlugin // Prevent chunk output
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['src', 'node_modules'],
  },
}
