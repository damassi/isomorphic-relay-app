// NOTE: If `dynamic-import-node` is in .babelrc it breaks webpack's bundle
// splitting. Only load during runtime on the node.js side.
// require('babel-register')({
//   plugins: ['dynamic-import-node'],
// })

import 'dotenv/config'
import Loadable from 'react-loadable'
import config from './webpack.config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import webpack from 'webpack'
import { createReloadable } from '@artsy/express-reloadable'

const { NODE_ENV, PORT } = process.env
const isDevelopment = NODE_ENV === 'development'
const app = express()

if (isDevelopment) {
  const compiler = webpack(config)

  app.use(morgan('dev'))
  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: false,
    })
  )
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      quiet: true,
      publicPath: config.output.publicPath,
      serverSideRender: true,
      stats: 'minimal',
    })
  )

  const mountAndReload = createReloadable(app, require)
  app.use(
    mountAndReload(path.resolve(__dirname, 'src'), {
      watchModules: ['react-relay-network-modern-ssr'],
    })
  )
} else {
  app.use(require('src'))
}

Loadable.preloadAll().then(() => {
  app.listen(PORT, () => {
    const bootMessage = isDevelopment
      ? `\n[App] Booting...  \n`
      : `\n[App] Started on http://localhost:5000  \n`

    console.log(bootMessage)
  })
})
