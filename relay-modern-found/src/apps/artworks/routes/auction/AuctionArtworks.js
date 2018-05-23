import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export const AuctionArtworks = createFragmentContainer(
  props => {
    return (
      <div>
        {props.artworks.map((artwork, index) => {
          return (
            <div key={index}>
              <h2>{artwork.artist.name}</h2>
              <h4>Gallery: {artwork.partner.name}</h4>
            </div>
          )
        })}
      </div>
    )
  },
  graphql`
    fragment AuctionArtworks_artworks on Artwork {
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
