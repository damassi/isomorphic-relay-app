import App from './components/App'
import HTML from './components/HTML'
import React from 'react'
import ReactDOM from 'react-dom/server'
import RelayContextProvider from 'relay-context-provider'
import express from 'express'
import { RootQuery } from './queries/RootQuery'
import { fetchQuery } from 'react-relay'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'

const app = (module.exports = express())

const variables = {
  id: 'loren-myhre-delta-marrow'
}

async function index(req, res) {
  try {
    const environment = getRelayEnvironment()
    const data = await fetchQuery(environment, RootQuery, variables)
    const bootstrap = JSON.stringify(environment.getStore().getSource())

    res.send(
      ReactDOM.renderToString(
        <HTML bootstrap={bootstrap}>
          <RelayContextProvider environment={environment} variables={variables}>
            <App {...data} />
          </RelayContextProvider>
        </HTML>
      )
    )
  } catch (error) {
    console.log('apps/artworks/server Error: ', error)
  }
}

app.get('/', index)
app.get('/home', index)
