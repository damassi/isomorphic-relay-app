import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'

function App(props) {
  const { artwork: { artist, partner } } = props

  return (
    <div>
      <h2>{artist.name}</h2>
      <h4>Gallery: {partner.name}</h4>
    </div>
  )
}

export default createFragmentContainer(
  App,
  graphql`
    fragment App_artwork on Artwork {
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
