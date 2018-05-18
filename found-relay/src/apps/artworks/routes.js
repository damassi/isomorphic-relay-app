import React from 'react'
// import makeRouteConfig from 'found/lib/makeRouteConfig'
import { graphql } from 'react-relay'
import { Layout } from './components/Layout'
// import { HomeRoute } from './routes/home/HomeRoute'

import Artwork from './routes/artwork/Artwork'
// import { ArtistsRoute } from './routes/artists/ArtistsRoute'
// import { ReactLoadableClientRoute } from './routes/react-loadable/ReactLoadableClientRoute'
// import { ReactLoadableServerRoute } from './routes/react-loadable/ReactLoadableServerRoute'

export const routes = [
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/artwork',
        Component: Artwork,
        query: graphql`
          query routes_ArtworkRouteQuery($id: String!) {
            artwork(id: $id) {
              ...Artwork_artwork
            }
          }
        `,
        prepareVariables: params => {
          return {
            id: 'loren-myhre-delta-marrow',
          }
        },
      },
      // {
      //   path: '/artist/:id',
      //   component: ArtistsRoute,
      // },
      // {
      //   path: '/react-loadable/client',
      //   component: ReactLoadableClientRoute,
      // },
      // {
      //   path: '/react-loadable/server',
      //   component: ReactLoadableServerRoute,
      // },
      // {
      //   path: '*',
      //   component: () => <div>NOT FOUND!</div>,
      // },
    ],
  },
]
