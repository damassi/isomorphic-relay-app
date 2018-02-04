import React from 'react'
import { ArtworksRoute } from './routes/artworks/ArtworksRoute'
import { ArtistsRoute } from './routes/artists/ArtistsRoute'
import { Layout } from './components/Layout'

export const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: ArtworksRoute,
      },
      {
        path: '/artist/:id',
        component: ArtistsRoute,
      },
      {
        path: '*',
        component: () => <div>NOT FOUND!</div>,
      },
    ],
  },
]
