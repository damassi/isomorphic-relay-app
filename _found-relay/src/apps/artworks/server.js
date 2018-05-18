import express from 'express'
import { mountServer } from 'lib/relay'
import { routes } from './routes'

const app = (module.exports = express())

app.use('/', mountServer(routes))
