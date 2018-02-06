import React from 'react'
import { Link } from 'react-router-dom'
import { PreloadLink } from 'lib/isomorphic-relay/PreloadLink'

export default function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <PreloadLink to="/artwork">
          Artwork{' '}
          <small>
            (query / transition loads after click if not already loaded)
          </small>
        </PreloadLink>
      </li>
      <li>
        <PreloadLink immediate to="/artist/jean-michel-basquiat">
          Artist <small>(loads immediately in background)</small>
        </PreloadLink>
      </li>
    </ul>
  )
}
