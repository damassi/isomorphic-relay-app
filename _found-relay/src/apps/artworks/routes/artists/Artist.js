import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

export function Artist(props) {
  const { artist: { name, location, bio } } = props

  return (
    <div>
      <h2>{name}</h2>
      <h4>Location: {location}</h4>
      <p>{bio}</p>
    </div>
  )
}

export default createFragmentContainer(
  Artist,
  graphql`
    fragment Artist_artist on Artist {
      id
      name
      location
      bio
    }
  `
)
