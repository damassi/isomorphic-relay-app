import 'dotenv/config'

import artworks from 'apps/artworks/server'
import config from '../webpack.config'
import express from 'express'
import morgan from 'morgan'
import webpack from 'webpack'

const {
  PORT
} = process.env

const app = express()
const compiler = webpack(config)

app.use(morgan('dev'))

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  serverSideRender: true,
  stats: {
    colors: true
  }
}))

app.use(require('webpack-hot-middleware')(compiler))
app.use(artworks)

app.listen(PORT, () => {
  console.log(`\n  ✨ Booting...  \n`)
})
