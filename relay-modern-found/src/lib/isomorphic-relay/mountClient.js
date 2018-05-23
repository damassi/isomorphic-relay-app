import BrowserProtocol from 'farce/lib/BrowserProtocol'
// import Loadable from 'react-loadable'
import React from 'react'
import ReactDOM from 'react-dom'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import createRender from 'found/lib/createRender'
import queryMiddleware from 'farce/lib/queryMiddleware'
import { RelayRouterProvider } from './RelayRouterProvider'
import { Resolver } from 'found-relay'
import { loadComponents } from 'loadable-components'

import { createRelayEnvironment } from './relayEnvironment'

export async function mountClient(routeConfig) {
  const environment = createRelayEnvironment(
    JSON.parse(window.__RELAY_BOOTSTRAP__)
  )
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

    loadComponents().then(() => {
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
