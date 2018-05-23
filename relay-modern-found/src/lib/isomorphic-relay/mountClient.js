import BrowserProtocol from 'farce/lib/BrowserProtocol'
import Loadable from 'react-loadable'
import createRender from 'found/lib/createRender'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import queryMiddleware from 'farce/lib/queryMiddleware'
import { Resolver } from 'found-relay'
import { RelayRouterProvider } from './RelayRouterProvider'
import React from 'react'
import ReactDOM from 'react-dom'

import { createRelayEnvironment } from './relayEnvironment'

export async function mountClient(routeConfig) {
  const environment = createRelayEnvironment(
    JSON.parse(window.__RELAY_BOOTSTRAP__)
  ) // eslint-disable-line
  const historyMiddlewares = [queryMiddleware]
  const resolver = new Resolver(environment)
  const render = createRender({})

  try {
    const Router = await createInitialFarceRouter({
      historyProtocol: new BrowserProtocol(),
      historyMiddlewares,
      routeConfig,
      resolver,
      render,
    })

    Loadable.preloadReady().then(() => {
      ReactDOM.hydrate(
        <RelayRouterProvider
          provide={{
            environment,
            routeConfig,
            resolver,
          }}
        >
          <Router resolver={resolver} />
        </RelayRouterProvider>,
        document.getElementById('react-root')
      )
    })
  } catch (error) {
    console.log('[isomorphic-relay] Error:', error)
  }
}
