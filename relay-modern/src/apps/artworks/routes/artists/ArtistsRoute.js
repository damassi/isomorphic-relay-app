import QueryLookupRenderer from 'relay-query-lookup-renderer'
import React, { Component } from 'react'
import Artist from './Artist'
import { graphql } from 'react-relay'
import { getRelayEnvironment } from 'lib/isomorphic-relay/getRelayEnvironment'

export class ArtistsRoute extends Component {
  static relay = {
    variables: {
      id: 'jean-michel-basquiat',
    },
    query: graphql`
      query ArtistsRouteQuery($id: String!) {
        artist(id: $id) {
          ...Artist_artist
        }
      }
    `,
  }

  render() {
    const { relay: { query, variables } } = ArtistsRoute

    return (
      <QueryLookupRenderer
        lookup
        retain
        environment={getRelayEnvironment(this.props.records)}
        query={query}
        variables={variables}
        render={({ error, props }) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <Artist {...props} />
          } else {
            return <div>Loading</div>
          }
        }}
      />
    )
  }
}
