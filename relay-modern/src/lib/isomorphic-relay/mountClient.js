import QueryLookupRenderer from 'relay-query-lookup-renderer'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'
import { getRelayRouteProps } from 'lib/isomorphic-relay/getRelayRouteProps'
import { renderRoutes } from 'react-router-config'

export function mountClient(routes, mountId) {
  const { __BOOTSTRAP__, location } = window
  const { relay: { records, response } } = JSON.parse(__BOOTSTRAP__)
  const { query, variables } = getRelayRouteProps(routes, location.pathname)

  ReactDOM.hydrate(
    <QueryLookupRenderer
      lookup
      environment={getRelayEnvironment(records)}
      query={query}
      variables={variables}
      render={({ error, props }) => {
        if (error) {
          return <div>{error.message}</div>
        } else if (props) {
          return <BrowserRouter>{renderRoutes(routes, response)}</BrowserRouter>
        } else {
          return <div>Loading</div>
        }
      }}
    />,

    document.getElementById(mountId)
  )
}
