import ArtworksApp from './components/ArtworksApp'
import React from 'react'
import { Layout } from './components/Layout'
import { graphql } from 'react-relay'

export const routes = [
  {
    component: Layout,
    routes: [
      {
        path: '/',
        exact: true,
        component: ArtworksApp,
        relay: {
          variables: {
            id: 'loren-myhre-delta-marrow',
          },
          query: graphql`
            query routesQuery($id: String!) {
              artwork(id: $id) {
                ...ArtworksApp_artwork
              }
            }
          `,
        },
      },
      {
        path: '/foo',
        component: () => <div>working</div>,
        relay: {
          variables: {
            id: 'loren-myhre-delta-marrow',
          },
        },
      },
      // {
      //   path: '*',
      //   component: () => <div>NOT FOUND!</div>
      // }
    ],
  },
]
