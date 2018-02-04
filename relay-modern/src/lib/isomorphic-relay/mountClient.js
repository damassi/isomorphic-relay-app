import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import * as cache from './cache'

export function mountClient(routes, mountId) {
  const { relay } = JSON.parse(window.__BOOTSTRAP__)

  cache.set(window.location.pathname, relay.response)

  ReactDOM.hydrate(
    <BrowserRouter>{renderRoutes(routes, relay)}</BrowserRouter>,
    document.getElementById(mountId)
  )
}
