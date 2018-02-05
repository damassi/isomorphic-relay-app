import React from 'react'
import { Link } from 'react-router-dom'
import { PreloadLink } from 'lib/isomorphic-relay/PreloadLink'

export default function Nav() {
  return (
    <ul>
      <li>
        <PreloadLink to="/">
          Home <small>(query / transition loads after click if not already loaded)</small>
        </PreloadLink>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <PreloadLink immediate to="/artist/jean-michel-basquiat">
          Artist <small>(loads immediately in background)</small>
        </PreloadLink>
      </li>
    </ul>
  )
}
