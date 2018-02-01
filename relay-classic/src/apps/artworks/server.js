import express from 'express'
import routes from './routes'
import { mountServer } from 'lib/isomorphic-relay/server'

const app = express()
export default app

app.use(mountServer(routes))
