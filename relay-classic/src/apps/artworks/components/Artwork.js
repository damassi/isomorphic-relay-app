import React from 'react'
import Relay from 'react-relay'

function Artwork (props) {
  const {
    artwork: {
      artist,
      partner
    }
  } = props

  return (
    <div>
      <h2>
        {artist.name}
      </h2>
      <h4>
        Gallery: {partner.name}
      </h4>
    </div>
  )
}

export default Relay.createContainer(Artwork, {
  fragments: {
    artwork: () => Relay.QL`
      fragment on Artwork {
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
  }
})
