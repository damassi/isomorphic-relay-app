import Helmet from 'react-helmet'
import IsomorphicRouter from 'isomorphic-relay-router'
import express from 'express'
import { artsyRelayMiddleware } from './config'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'

export function mountServer (routes) {
  function serverSideRender (req, res, next) {
    const location = req.originalUrl

    match({
      routes,
      location
    }, handleRoute)

    function handleRoute (error, redirectLocation, renderProps) {
      function render ({ data, props }) {
        const content = renderToString(IsomorphicRouter.render(props))
        const head = Helmet.rewind()

        res.send(`
          <html ${head.htmlAttributes.toString()}>
            <head>
              ${renderHeadTags([
                head.title,
                head.meta,
                head.link
              ])}

              <script>
                var __BOOTSTRAP__ = ${JSON.stringify(data)};
              </script>

              ${head.script.toString()}
            </head>
            <body>
              <div id='root'><div>${content}</div></div>
            </body>
          </html>
        `)
      }

      if (error) {
        next(error)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        IsomorphicRouter
          .prepareData(renderProps, res.locals.networkLayer)
          .then(render)
          .catch(next)
      } else {
        res.status(404).send('404: Not found')
      }
    }
  }

  const app = express.Router()
  app.use(artsyRelayMiddleware)

  app.get('/*', (req, res, next) => {
    serverSideRender(req, res, next)
  })

  return app
}

/** Helpers */

function renderHeadTags (tags) {
  return tags.reduce((str, tag) => `${str}${tag.toString()}\n`, '')
}
