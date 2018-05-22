import createRender from 'found/lib/createRender'
import express from 'express'
import queryMiddleware from 'farce/lib/queryMiddleware'
import { getFarceResult } from 'found/lib/server'
import { Resolver } from 'found-relay'
import ReactDOMServer from 'react-dom/server'
import serialize from 'serialize-javascript'

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

      ReactDOMServer.renderToString(element)
      const relayData = await environment.relaySSRMiddleware.getCache()

      setTimeout(() => {
        const html = ReactDOMServer.renderToString(element)
        console.log('SERVER ', html)

        res.status(status).send(`
          <html>
            <head>
              <title>Isomorphic Relay Modern App</title>
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

              ${
                /*getBundles(stats, modules)
                .map(bundle => {
                  return `<script src="/assets/${bundle.file}"></script>`
                })
              .join('\n')*/ ''
              }
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

// import Loadable from 'react-loadable'
// import React from 'react'
// import RelayContextProvider from 'relay-context-provider'
// import chalk from 'chalk'
// import express from 'express'
// import serialize from 'serialize-javascript'
// import stats from '../../../public/assets/react-loadable.json'
// import { RelayRouterProvider } from './RelayRouterProvider'
// import { Resolver } from 'found-relay';
// import { StaticRouter } from 'react-router'
// import { fetchQuery } from 'react-relay'
// import { getBundles } from 'react-loadable/webpack'
// import { getFarceResult } from 'found/lib/server';
// import { getRelayEnvironment, getRelayRouteProps } from 'lib/isomorphic-relay'
// import { renderRoutes } from 'react-router-config'
// import { renderToString } from 'react-dom/server'

// export function mountServer(routes, useFound = false) {
//   const app = express.Router()

//   app.get('/*', serverSideRender)

//   async function serverSideRender(req, res, next) {
//     try {
//       const environment = getRelayEnvironment()

//       const resolver = new Resolver(environment);

//       const { redirect, status, element } = await getFarceResult({
//         url: req.url,
//         historyMiddlewares,
//         routeConfig,
//         resolver,
//         render,
//       });

//       if (redirect) {
//         res.redirect(302, redirect.url);
//         return;
//       }

//       renderToString(element);
//       const relayData = await environment.relaySSRMiddleware.getCache();

//       setTimeout(() => {
//         const html = renderToString(element);

//         res.status(200).send(`
//           <html>
//             <head>
//               <title>Isomorphic Relay Modern App</title>
//             </head>
//             <body>
//               <div id="react-root">${html}</div>

//               <script>
//                 window.__BOOTSTRAP__ = ${serialize(JSON.stringify(relayData), {
//                   isJSON: true
//                 })};
//               </script>

//               <script src="/assets/manifest.js"></script>
//               <script src="/assets/artworks.js"></script>

//               ${/*getBundles(stats, modules)
//                 .map(bundle => {
//                   return `<script src="/assets/${bundle.file}"></script>`
//                 })
//               .join('\n')*/ '' }
//             </body>
//           </html>
//         `)
//       }, 0)
//     } catch (error) {
//       console.log(chalk.red('\n[isomorphic-relay] Error:', error))
//       next(error)
//     }
//   }

//   return app
// }
