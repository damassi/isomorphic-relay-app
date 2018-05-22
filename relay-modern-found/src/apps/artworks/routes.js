import React from 'react'
import { Layout } from './components/Layout'
import { HomeRoute } from './routes/home/HomeRoute'
import { ArtistRoute } from './routes/artist/ArtistRoute'
import { graphql } from 'react-relay'
// import { ArtistsRoute } from './routes/artists/ArtistsRoute'
import { ReactLoadableClientRoute } from './routes/react-loadable/ReactLoadableClientRoute'
import { ReactLoadableServerRoute } from './routes/react-loadable/ReactLoadableServerRoute'

export const routes = [
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: HomeRoute,
      },
      {
        path: '/about',
        Component: () => <div>About page!</div>,
      },
      {
        path: '/artist/:id',
        Component: ArtistRoute,
        prepareVariables: params => ({ id: 'pablo-picasso' }),
        query: graphql`
          query routes_ArtistRouteQuery($id: String!) {
            artist(id: $id) {
              ...ArtistRoute_artist
            }
          }
        `,
      },
      {
        path: '/react-loadable/client',
        Component: ReactLoadableClientRoute,
      },
      {
        path: '/react-loadable/server',
        Component: ReactLoadableServerRoute,
      },
      {
        path: '*',
        component: () => <div>NOT FOUND!</div>,
      },
    ],
  },
]
