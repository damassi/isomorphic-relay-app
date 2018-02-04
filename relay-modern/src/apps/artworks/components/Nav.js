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
        <Link to="/artist/jean-michel-basquiat">Artist</Link>
      </li>
    </ul>
  )
}
