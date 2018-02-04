import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export function Artists(props) {
  const { artist: { name, location, bio } } = props

  return (
    <div>
      <h2>{name}</h2>
      <h4>Location: {location}</h4>
      <p>{bio}</p>
    </div>
  )
}

const ArtistsApp = createFragmentContainer(
  Artists,
  graphql`
    fragment ArtistsApp_artist on Artist {
      id
      name
      location
      bio
    }
  `
)

ArtistsApp.relay = {
  variables: {
    id: 'jean-michel-basquiat',
  },
  query: graphql`
    query ArtistsAppQuery($id: String!) {
      artist(id: $id) {
        ...ArtistsApp_artist
      }
    }
  `,
}

export default ArtistsApp
