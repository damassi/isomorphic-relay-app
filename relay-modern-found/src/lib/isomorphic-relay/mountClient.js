import BrowserProtocol from 'farce/lib/BrowserProtocol'
import Loadable from 'react-loadable'
import createRender from 'found/lib/createRender'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import queryMiddleware from 'farce/lib/queryMiddleware'
import { Resolver } from 'found-relay'
import React from 'react'
import ReactDOM from 'react-dom'

import { createRelayEnvironment } from './relayEnvironment'

export async function mountClient(routeConfig) {
  const environment = createRelayEnvironment(window.__RELAY_BOOTSTRAP__) // eslint-disable-line
  const historyMiddlewares = [queryMiddleware]
  const resolver = new Resolver(environment)
  const render = createRender({})

  environment.relaySSRMiddleware.debug = true

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
        <Router resolver={resolver} />,
        document.getElementById('react-root')
      )
    })
  } catch (error) {
    console.log('[isomorphic-relay] Error:', error)
  }
}
