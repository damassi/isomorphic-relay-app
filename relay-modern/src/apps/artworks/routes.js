import ArtworksApp from './routes/ArtworksApp'
import ArtistsApp from './routes/ArtistsApp'
import React from 'react'
import { Layout } from './components/Layout'

export const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: ArtworksApp,
      },
      {
        path: '/artist/:id',
        component: ArtistsApp,
      },
      {
        path: '*',
        component: () => <div>NOT FOUND!</div>,
      },
    ],
  },
]
