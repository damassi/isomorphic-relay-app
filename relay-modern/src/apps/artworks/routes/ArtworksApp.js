import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export function Artworks(props) {
  const { artwork: { artist, partner } } = props

  return (
    <div>
      <h2>{artist.name}</h2>
      <h4>Gallery: {partner.name}</h4>
    </div>
  )
}

const ArtworksApp = createFragmentContainer(
  Artworks,
  graphql`
    fragment ArtworksApp_artwork on Artwork {
      artist {
        name
      }
      meta {
        title
      }
      partner {
        name
      }
    }
  `
)

ArtworksApp.relay = {
  variables: {
    id: 'loren-myhre-delta-marrow',
  },
  query: graphql`
    query ArtworksAppQuery($id: String!) {
      artwork(id: $id) {
        ...ArtworksApp_artwork
      }
    }
  `,
}

export default ArtworksApp
