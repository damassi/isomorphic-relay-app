import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export function ArtworksApp(props) {
  const { artwork: { artist, partner } } = props

  return (
    <div>
      <h2>{artist.name}</h2>
      <h4>Gallery: {partner.name}</h4>
    </div>
  )
}

const WrappedArtworksApp = createFragmentContainer(
  ArtworksApp,
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

// WrappedArtworksApp.relay = {
//   variables: 'loren-myhre-delta-marrow',
//   query: graphql`
//     query ArtworksAppQuery($id: String!) {
//       artwork(id: $id) {
//         ...ArtworksApp_artwork
//       }
//     }
//   `,
// }

export default WrappedArtworksApp
