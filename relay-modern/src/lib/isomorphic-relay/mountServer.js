import React from 'react'
import RelayContextProvider from 'relay-context-provider'
import chalk from 'chalk'
import express from 'express'
import { Cache } from './cache'
import { RelayRouterContext } from './RelayRouterContext'
import { StaticRouter } from 'react-router'
import { fetchQuery } from 'react-relay'
import { getRelayEnvironment, getRelayRouteProps } from 'lib/isomorphic-relay'
import { isFunction } from 'lodash/fp'
import { renderRoutes } from 'react-router-config'
import { renderToString } from 'react-dom/server'

export function mountServer(routes, getComponent) {
  const app = express.Router()

  app.get('/*', serverSideRender)

  async function serverSideRender(req, res, next) {
    try {
      let response = {}
      let context = {}

      const { query, variables } = getRelayRouteProps(routes, req.url)
      const environment = getRelayEnvironment()

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

      const IsomorphicRelayRouter = ({ children, routerProps }) => {
        return (
          <RelayRouterContext provide={{ routerCache: {}, routes }}>
            <RelayContextProvider
              environment={environment}
              variables={variables}
            >
              <StaticRouter
                location={req.url}
                context={context}
                {...routerProps}
              >
                {renderRoutes(routes, bootstrap.relay)}
              </StaticRouter>
            </RelayContextProvider>

            {children}
          </RelayRouterContext>
        )
      }

      const html = renderToString(
        isFunction(getComponent) ? (
          getComponent({ IsomorphicRelayRouter, bootstrap })
        ) : (
          <IsomorphicRelayRouter />
        )
      )

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
