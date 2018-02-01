import Artwork from './components/Artwork'
import React from 'react'
import ReactDOM from 'react-dom'
import QueryLookupRenderer from 'relay-query-lookup-renderer'
import { graphql } from 'react-relay'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'

ReactDOM.render(
  <QueryLookupRenderer
    lookup
    environment={getRelayEnvironment(window.__BOOTSTRAP__)}
    query={graphql`
      query clientQuery($id: String!) {
        artwork(id: $id) {
          ...Artwork_artwork
        }
      }
    `}
    variables={{
      id: 'loren-myhre-delta-marrow'
    }}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>
      } else if (props) {
        return <Artwork artwork={props.artwork} />
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
