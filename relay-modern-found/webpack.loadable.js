import { ReactLoadablePlugin } from 'react-loadable/webpack'
import chalk from 'chalk'
import config from './webpack.config'
import mkdirp from 'mkdirp'
import webpack from 'webpack'

mkdirp.sync(config.output.path, error => {
  if (error) {
    console.log(
      chalk.red('[isomorphic-relay] Error bundling react-loadable.json'),
      error
    )
  }
})

export default {
  entry: config.entry,
  output: config.output,
  module: config.module,
  plugins: [
    new ReactLoadablePlugin({
      filename: './public/assets/react-loadable.json',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
}
