import BrowserProtocol from 'farce/lib/BrowserProtocol'
import createInitialFarceRouter from 'found/lib/createInitialFarceRouter'
import createRender from 'found/lib/createRender'
import queryMiddleware from 'farce/lib/queryMiddleware'
import React from 'react'
import ReactDOM from 'react-dom'

import { ClientFetcher } from './fetcher'
import { createResolver } from './relayEnvironment'

export async function mountClient(routeConfig) {
  const fetcher = new ClientFetcher(
    process.env.METAPHYSICS_BASE_URL,
    window.__RELAY_PAYLOADS__
  )
  const resolver = createResolver(fetcher)
  const render = createRender({})

  const Router = await createInitialFarceRouter({
    historyProtocol: new BrowserProtocol(),
    historyMiddlewares: [queryMiddleware],
    routeConfig,
    resolver,
    render,
  })

  ReactDOM.hydrate(
    <Router resolver={resolver} />,
    document.getElementById('root')
  )
}
