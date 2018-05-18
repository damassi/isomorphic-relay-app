import ReactDOMServer from 'react-dom/server'
import express from 'express'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createRender from 'found/lib/createRender'
import serialize from 'serialize-javascript'
import { getFarceResult } from 'found/lib/server'
import { ServerFetcher } from './fetcher'
import { createResolver } from './relayEnvironment'

export function mountServer(routeConfig) {
  const app = express.Router()
  const fetcher = new ServerFetcher(process.env.METAPHYSICS_BASE_URL)
  const resolver = createResolver(fetcher)
  const render = createRender({})

  app.get('/*', serverSideRender)

  async function serverSideRender(req, res, next) {
    try {
      const { redirect, status, element } = await getFarceResult({
        url: req.url,
        historyMiddlewares: [queryMiddleware],
        routeConfig,
        resolver,
        render,
      })

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      res.status(status).send(`
      <html>
        <head>
          <title>Found Relay example</title>
        </head>
        <body>
          <div id="root">${ReactDOMServer.renderToString(element)}</div>

          <script>
            window.__RELAY_PAYLOADS__ = ${serialize(fetcher, { isJSON: true })};
          </script>
          <script src="/assets/artworks.js" />

          <!-- NOTE: Needed for react-loadable -->
          <script>window.main();</script>
        </body>
      </html>
    `)
    } catch (error) {
      console.log(error)
    }
  }

  return app
}
