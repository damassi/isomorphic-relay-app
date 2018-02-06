import React from 'react'
import { HomeRoute } from './routes/home/HomeRoute'
import { ArtworkRoute } from './routes/artwork/ArtworkRoute'
import { ArtistsRoute } from './routes/artists/ArtistsRoute'
import { Layout } from './components/Layout'

export const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomeRoute,
      },
      {
        path: '/artwork',
        component: ArtworkRoute,
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
