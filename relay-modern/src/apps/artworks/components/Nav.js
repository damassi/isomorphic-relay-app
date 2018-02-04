import React from 'react'
import { Link } from 'react-router-dom'
import { PreloadLink } from 'lib/isomorphic-relay/PreloadLink'

export default function Nav() {
  return (
    <ul>
      <li>
        <PreloadLink to="/">Home</PreloadLink>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <PreloadLink to="/artist/jean-michel-basquiat">Artist</PreloadLink>
      </li>
    </ul>
  )
}
