import Artwork from './components/Artwork'
import HTML from './components/HTML'
import React from 'react'
import ReactDOM from 'react-dom/server'
import RelayContextProvider from 'relay-context-provider'
import express from 'express'
import { fetchQuery, graphql } from 'react-relay'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'

const app = (module.exports = express())

const variables = {
  id: 'loren-myhre-delta-marrow'
}

const serverQuery = graphql`
  query serverQuery($id: String!) {
    artwork(id: $id) {
      ...Artwork_artwork
    }
  }
`

async function index(req, res) {
  try {
    const environment = getRelayEnvironment()
    const data = await fetchQuery(environment, serverQuery, variables)
    const bootstrap = JSON.stringify(environment.getStore().getSource())

    res.send(
      ReactDOM.renderToString(
        <HTML bootstrap={bootstrap}>
          <RelayContextProvider environment={environment} variables={variables}>
            <Artwork {...data} />
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
