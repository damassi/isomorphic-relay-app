import Loadable from 'react-loadable'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import createRender from 'found/lib/createRender'
import express from 'express'
import queryMiddleware from 'farce/lib/queryMiddleware'
import serialize from 'serialize-javascript'
import stats from '../../../public/assets/react-loadable.json'
import { getBundles } from 'react-loadable/webpack'
import { Resolver } from 'found-relay'
import { getFarceResult } from 'found/lib/server'

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

      // Async modules
      const modules = []

      ReactDOMServer.renderToString(
        <Loadable.Capture
          report={moduleName => {
            modules.push(moduleName)
          }}
        >
          {element}
        </Loadable.Capture>
      )

      const relayData = await environment.relaySSRMiddleware.getCache()

      setTimeout(() => {
        const html = ReactDOMServer.renderToString(element)
        console.log(html)

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

              <script src="/assets/manifest.bundle.js"></script>
              <script src="/assets/artworks.js"></script>

              ${getBundles(stats, modules)
                .filter(bundle => bundle.file.endsWith('.js'))
                .map(bundle => {
                  return `<script src="/assets/${bundle.file}"></script>`
                })
                .join('\n')}
          </body>
        </html>
        `)
      }, 0)
    } catch (error) {
      console.log(error) // eslint-disable-line
    }
  })

  return app
}
