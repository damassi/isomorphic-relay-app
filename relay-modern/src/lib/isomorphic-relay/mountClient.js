import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Cache } from './cache'
import { RelayRouterContext } from './RelayRouterContext'
import { renderRoutes } from 'react-router-config'

export function mountClient(routes, mountId) {
  const { relay } = JSON.parse(window.__BOOTSTRAP__)
  const routerCache = new Cache()

  routerCache.set(window.location.pathname, relay.response)

  ReactDOM.hydrate(
    <RelayRouterContext provide={{ routerCache, routes }}>
      <BrowserRouter>{renderRoutes(routes, relay)}</BrowserRouter>
    </RelayRouterContext>,
    document.getElementById(mountId)
  )
}
