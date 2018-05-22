import React from 'react'
import { Artworks } from './Artworks'
import { createFragmentContainer, graphql } from 'react-relay'

export const ArtistRoute = createFragmentContainer(
  ({ artist }) => {
    return (
      <div>
        <h1>{artist.name}</h1>
        <p>{artist.bio}</p>

        <Artworks artworks={artist.artworks} />
      </div>
    )
  },
  graphql`
    fragment ArtistRoute_artist on Artist {
      id
      name
      bio
      artworks {
        ...Artworks_artworks
      }
    }
  `
)
