import 'dotenv/config'
import config from './webpack.config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import webpack from 'webpack'
import { createReloadable } from '@artsy/express-reloadable'

const { PORT } = process.env

const app = express()
const compiler = webpack(config)

app.use(morgan('dev'))
app.use(
  require('webpack-hot-middleware')(compiler, {
    log: false
  })
)
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    quiet: true,
    publicPath: config.output.publicPath,
    serverSideRender: true,
    stats: {
      colors: true
    }
  })
)

const mountAndReload = createReloadable(app, require)
app.use(mountAndReload(path.resolve(__dirname, 'src')))

app.listen(PORT, () => {
  console.log(`\n[App] Booting...  \n`)
})
