import Loadable from 'react-loadable'
import React from 'react'
import RelayContextProvider from 'relay-context-provider'
import chalk from 'chalk'
import express from 'express'
import serialize from 'serialize-javascript'
import stats from '../../../public/assets/react-loadable.json'
import { RelayRouterProvider } from './RelayRouterProvider'
import { StaticRouter } from 'react-router'
import { fetchQuery } from 'react-relay'
import { getBundles } from 'react-loadable/webpack'
import { getRelayEnvironment, getRelayRouteProps } from 'lib/isomorphic-relay'
import { renderRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'

export function mountServer(routes, useFound = false) {
  const app = express.Router()

  app.get('/*', serverSideRender)

  async function serverSideRender(req, res, next) {
    try {
      const {
        environment,
        resolver,
        relaySSRMiddleware,
      } = getRelayEnvironment()

      if (useFound) {
        // const { redirect, status, element } = await getFarceResult({
        //   url: req.url,
        //   historyMiddlewares: [queryMiddleware],
        //   routeConfig,
        //   resolver,
        //   render,
        // })
        // if (redirect) {
        //   res.redirect(302, redirect.url)
        //   return
        // }
        // const APP = renderToString(element)
        // res.status(status).send(`
        //   <html>
        //     <head>
        //       <title>Isomorphic Relay Modern App</title>
        //     </head>
        //     <body>
        //       <div id="react-root">${APP}</div>
        //       <script>
        //         window.__BOOTSTRAP__ = ${serialize(bootstrap)};
        //       </script>
        //       <script src="/assets/manifest.js"></script>
        //       <script src="/assets/artworks.js"></script>
        //     </body>
        //   </html>
        // `)
      } else {
        const { query, variables } = getRelayRouteProps(routes, req.url)
        let response = {}
        let context = {}

        if (query) {
          response = await fetchQuery(environment, query, variables)
        }

        const relayData = await relaySSRMiddleware.getCache()
        // console.log(relayData)

        const bootstrap = {
          relay: {
            records: environment.getStore().getSource(),
            response,
            variables,
          },
        }

        let modules = []

        const getApp = () => (
          <Loadable.Capture
            report={moduleName => {
              modules.push(moduleName)
            }}
          >
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
          </Loadable.Capture>
        )

        renderToString(getApp())
        const APP = renderToString(getApp())
        console.log(APP)

        if (context.status === 404) {
          return res.status(404)
        }

        if (context.status === 302) {
          return res.redirect(302, context.url)
        }

        console.log(serialize(bootstrap))

        res.status(200).send(`
          <html>
            <head>
              <title>Isomorphic Relay Modern App</title>
            </head>
            <body>
              <div id="react-root">${APP}</div>

              <script>
                window.__BOOTSTRAP__ = ${serialize(bootstrap)};
                window.relayData = ${JSON.stringify(relayData)};
              </script>

              <script src="/assets/manifest.js"></script>
              <script src="/assets/artworks.js"></script>

              ${getBundles(stats, modules)
                .map(bundle => {
                  return `<script src="/assets/${bundle.file}"></script>`
                })
                .join('\n')}
            </body>
          </html>
        `)
      }
    } catch (error) {
      console.log(chalk.red('\n[isomorphic-relay] Error:', error))
      next(error)
    }
  }

  return app
}
