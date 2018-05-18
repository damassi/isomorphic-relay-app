import React from 'react'
import { Layout } from './components/Layout'
import { HomeRoute } from './routes/home/HomeRoute'
import { ArtworkRoute } from './routes/artwork/ArtworkRoute'
import { ArtistsRoute } from './routes/artists/ArtistsRoute'
import { ReactLoadableClientRoute } from './routes/react-loadable/ReactLoadableClientRoute'
import { ReactLoadableServerRoute } from './routes/react-loadable/ReactLoadableServerRoute'

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
        path: '/react-loadable/client',
        component: ReactLoadableClientRoute,
      },
      {
        path: '/react-loadable/server',
        component: ReactLoadableServerRoute,
      },
      {
        path: '*',
        component: () => <div>NOT FOUND!</div>,
      },
    ],
  },
]
