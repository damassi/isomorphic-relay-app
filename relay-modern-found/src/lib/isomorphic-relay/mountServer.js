import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createRender from 'found/lib/createRender'
import express from 'express'
import queryMiddleware from 'farce/lib/queryMiddleware'
import serialize from 'serialize-javascript'
import { RelayRouterProvider } from './RelayRouterProvider'
import { Resolver } from 'found-relay'
import { getFarceResult } from 'found/lib/server'
import { getLoadableState } from 'loadable-components/server'

import { createRelayEnvironment } from './relayEnvironment'

export function mountServer(routeConfig) {
  const app = express()

  app.get('/*', async (req, res) => {
    try {
      const environment = createRelayEnvironment()
      const historyMiddlewares = [queryMiddleware]
      const resolver = new Resolver(environment)
      const render = createRender({})

      const { redirect, status, element } = await getFarceResult({
        url: req.url,
        historyMiddlewares,
        routeConfig,
        resolver,
        render,
      })

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      const APP = (
        <RelayRouterProvider
          provide={{
            environment,
            resolver,
            routeConfig,
          }}
        >
          {element}
        </RelayRouterProvider>
      )

      // Kick off relay requests
      ReactDOMServer.renderToString(APP)
      const relayData = await environment.relaySSRMiddleware.getCache()

      getLoadableState(APP).then(loadableState => {
        const html = ReactDOMServer.renderToString(APP)

        res.status(status).send(`
          <html>
            <head>
              <title>Isomorphic Found Relay App</title>
            </head>
            <body>
              <div id="react-root">${html}</div>

              <script>
                window.__RELAY_BOOTSTRAP__ = ${serialize(
                  JSON.stringify(relayData),
                  {
                    isJSON: true,
                  }
                )};
              </script>

              ${loadableState.getScriptTag()}

              <script src="/assets/manifest.bundle.js"></script>
              <script src="/assets/artworks.bundle.js"></script>
          </body>
        </html>
        `)
      })
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  })

  return app
}
