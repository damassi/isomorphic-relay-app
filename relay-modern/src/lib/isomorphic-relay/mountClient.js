import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Cache } from './cache'
import { RelayRouterProvider } from './RelayRouterProvider'
import { renderRoutes } from 'react-router-config'

export function mountClient(routes, mountId) {
  const { relay } = JSON.parse(window.__BOOTSTRAP__)
  const routerCache = new Cache()

  routerCache.set(window.location.pathname, relay.response)

  ReactDOM.hydrate(
    <RelayRouterProvider provide={{ routerCache, routes }}>
      <BrowserRouter>{renderRoutes(routes, relay)}</BrowserRouter>
    </RelayRouterProvider>,
    document.getElementById(mountId)
  )
}
