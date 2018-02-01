import IsomorphicRelay from 'isomorphic-relay'
import IsomorphicRouter from 'isomorphic-relay-router'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory as history, match } from 'react-router'
import { artsyRelayEnvironment } from './config'

export function mountClient (routes, mountId = 'root') {
  const mountPoint = document.getElementById(mountId)
  const environment = artsyRelayEnvironment()

  IsomorphicRelay
    .injectPreparedData(environment, window.__BOOTSTRAP__)

  match({
    routes,
    history
  }, handleRoute)

  function handleRoute (error, redirectLocation, renderProps) {
    if (error) {
      console.error(error)
    } else if (renderProps) {
      IsomorphicRouter
        .prepareInitialRender(environment, renderProps)
        .then(props => {
          ReactDOM.render(<Router {...props} key={Math.random()} />, mountPoint)
        })
    }
  }
}
