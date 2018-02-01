import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'
import QueryLookupRenderer from 'relay-query-lookup-renderer'
import { RootQuery } from './queries/RootQuery'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'

ReactDOM.render(
  <QueryLookupRenderer
    lookup
    environment={getRelayEnvironment(window.__BOOTSTRAP__)}
    query={RootQuery}
    variables={{
      id: 'loren-myhre-delta-marrow'
    }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        return <App artwork={props.artwork} />
      } else {
        return <div>Loading</div>
      }
    }}
  />,
  document.getElementById('react-root')
)

if (module.hot) {
  module.hot.accept()
}
