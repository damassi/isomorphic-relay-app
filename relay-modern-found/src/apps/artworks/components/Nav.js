import React from 'react'
import { Link } from 'found'
import { PreloadLink } from 'lib/isomorphic-relay/PreloadLink'

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
        <PreloadLink to="/artsy">Artsy</PreloadLink>
      </li>
      <li>
        <PreloadLink to="/artist/pablo-picasso">Pablo Picasso</PreloadLink>
      </li>
      <li>
        <PreloadLink to="/artist/pablo-picasso/auction/shared-live-mocktion-k8s">
          Artist + Artsy Auction (nested queries)
        </PreloadLink>
      </li>
      <li>
        <PreloadLink immediate to="/auction/shared-live-mocktion-k8s">
          Auction (loads immediately in the background)
        </PreloadLink>
      </li>
      <li>
        <Link to="/react-loadable/client">React Loadable - Clientside</Link>
      </li>
      <li>
        <Link to="/react-loadable/server">React Loadable - SSR</Link>
      </li>
    </ul>
  )
}
