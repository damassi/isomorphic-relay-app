import HTML from './components/HTML'
import React from 'react'
import express from 'express'
import { mountServer } from 'lib/isomorphic-relay'
import { routes } from './routes'

const app = (module.exports = express())

app.use(
  '/',
  mountServer(routes, ({ bootstrap, IsomorphicRelayRouter }) => {
    return (
      <HTML bootstrap={JSON.stringify(bootstrap)}>
        <IsomorphicRelayRouter />
      </HTML>
    )
  })
)
