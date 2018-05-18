import { ReactLoadablePlugin } from 'react-loadable/webpack'
import chalk from 'chalk'
import config from './webpack.config'
import mkdirp from 'mkdirp'

mkdirp.sync(config.output.path, (error) => {
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
  ],
}
