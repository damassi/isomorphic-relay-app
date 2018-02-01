import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

function Artwork(props) {
  const { artwork: { artist, partner } } = props

  return (
    <div>
      <h2>{artist.name}</h2>
      <h4>Gallery: {partner.name}</h4>
    </div>
  )
}

export default createFragmentContainer(
  Artwork,
  graphql`
    fragment Artwork_artwork on Artwork {
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
