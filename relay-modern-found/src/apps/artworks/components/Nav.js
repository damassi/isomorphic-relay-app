import React from 'react'
import { Link } from 'found'
// import { PreloadLink } from 'lib/isomorphic-relay/PreloadLink'

export default function Nav() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/artist/pablo-picasso">Pablo Picasso</Link>
      </li>
      <li>
        <Link to="/react-loadable/client">React Loadable - Clientside</Link>
      </li>
      <li>
        <Link to="/react-loadable/server">React Loadable - SSR</Link>
      </li>
      {/* <li>
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
      <li>
        <Link to="/react-loadable/client">React Loadable - Clientside</Link>
      </li>
      <li>
        <Link to="/react-loadable/server">React Loadable - SSR</Link>
      </li> */}
    </ul>
  )
}
