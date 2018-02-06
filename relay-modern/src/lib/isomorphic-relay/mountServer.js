import React from 'react'
import RelayContextProvider from 'relay-context-provider'
import chalk from 'chalk'
import express from 'express'
import serialize from 'serialize-javascript'
import { RelayRouterProvider } from './RelayRouterProvider'
import { StaticRouter } from 'react-router'
import { fetchQuery } from 'react-relay'
import { getRelayEnvironment, getRelayRouteProps } from 'lib/isomorphic-relay'
import { renderRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'

export function mountServer(routes, getComponent) {
  const app = express.Router()

  app.get('/*', serverSideRender)

  async function serverSideRender(req, res, next) {
    try {
      const { query, variables } = getRelayRouteProps(routes, req.url)
      const environment = getRelayEnvironment()
      let response = {}
      let context = {}

      if (query) {
        response = await fetchQuery(environment, query, variables)
      }

      const bootstrap = {
        relay: {
          records: environment.getStore().getSource(),
          response,
          variables,
        },
      }

      const App = (
        <html>
          <head>
            <title>Isomorphic Relay Modern App</title>
          </head>
          <body>
            <div id="react-root">
              <RelayRouterProvider provide={{ routerCache: {}, routes }}>
                <RelayContextProvider
                  environment={environment}
                  variables={variables}
                >
                  <StaticRouter location={req.url} context={context}>
                    {renderRoutes(routes, bootstrap.relay)}
                  </StaticRouter>
                </RelayContextProvider>
              </RelayRouterProvider>
            </div>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.__BOOTSTRAP__ = ${serialize(bootstrap)};
                `,
              }}
            />
            <script src="/assets/artworks.js" />
          </body>
        </html>
      )

      const html = renderToString(App)

      if (context.status === 404) {
        res.status(404)
      }

      if (context.status === 302) {
        return res.redirect(302, context.url)
      }

      res.status(200).send(html)
    } catch (error) {
      console.log(chalk.red('\n[isomorphic-relay] Error:', error))
      next(error)
    }
  }

  return app
}
