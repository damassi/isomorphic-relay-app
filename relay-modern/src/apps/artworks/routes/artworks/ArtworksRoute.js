import QueryLookupRenderer from 'relay-query-lookup-renderer'
import React, { Component } from 'react'
import Artwork from './Artwork'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'
import { graphql } from 'react-relay'

export class ArtworksRoute extends Component {
  static relay = {
    variables: {
      id: 'loren-myhre-delta-marrow',
    },
    query: graphql`
      query ArtworksRouteQuery($id: String!) {
        artwork(id: $id) {
          ...Artwork_artwork
        }
      }
    `,
  }

  render() {
    const { relay: { query, variables } } = ArtworksRoute

    return (
      <QueryLookupRenderer
        lookup
        environment={getRelayEnvironment(this.props.records)}
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
