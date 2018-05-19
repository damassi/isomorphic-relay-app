import QueryLookupRenderer from 'relay-query-lookup-renderer'
import React, { Component } from 'react'
import Artwork from './Artwork'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'
import { graphql } from 'react-relay'

export class ArtworkRoute extends Component {
  static relay = {
    variables: {
      id: 'loren-myhre-delta-marrow',
    },
    query: graphql`
      query ArtworkRouteQuery($id: String!) {
        artwork(id: $id) {
          ...Artwork_artwork
        }
      }
    `,
  }

  render() {
    const { relay: { query, variables } } = ArtworkRoute
    const { environment } = getRelayEnvironment(this.props.records)

    return (
      <QueryLookupRenderer
        lookup
        retain
        environment={environment}
        query={query}
        variables={variables}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <Artwork {...props} />
          } else {
            return <div>Loading</div>
          }
        }}
      />
    )
  }
}
