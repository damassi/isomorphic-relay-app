import React from 'react'
import { Link } from 'react-router-dom'

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
        <Link to="/artwork/loren-myhre-delta-marrow">Artwork</Link>
      </li>
    </ul>
  )
}
