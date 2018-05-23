import React from 'react'
import { graphql } from 'react-relay'
import { Layout } from './components/Layout'
import { HomeRoute } from './routes/home/HomeRoute'
import { ArtistRoute } from './routes/artist/ArtistRoute'
import { AuctionRoute } from './routes/auction/AuctionRoute'
import { ReactLoadableClientRoute } from './routes/react-loadable/ReactLoadableClientRoute'
import { ReactLoadableServerRoute } from './routes/react-loadable/ReactLoadableServerRoute'
import { ArtworkGrid } from '@artsy/reaction/dist/Components/ArtworkGrid'

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
        path: '/artsy/:id',
        prepareVariables: params => ({ id: 'pablo-picasso' }),
        Component: ArtworkGrid,
        // getComponent: ({ artworks }) => {
        //   return import('@artsy/reaction/dist/Components/ArtworkGrid').then(
        //     module => module.ArtworkGrid
        //   )
        // },
        query: graphql`
          query routes_ArtsyQuery($artistID: String!) {
            artist(id: $artistID) {
              artworks: artworks_connection(first: 10) {
                ...ArtworkGrid_artworks
              }
            }
          }
        `,
      },
      {
        path: '/artist/:id',
        prepareVariables: params => ({ id: 'pablo-picasso' }),
        Component: ArtistRoute,
        query: graphql`
          query routes_ArtistRouteQuery($id: String!) {
            artist(id: $id) {
              id
              ...ArtistRoute_artist
            }
          }
        `,
        children: [
          {
            path: '/auction/:id',
            getComponent: () =>
              import('./routes/auction/AuctionRoute').then(module => {
                return module.AuctionRoute
              }),
            prepareVariables: params => ({
              id: 'shared-live-mocktion-k8s',
            }),
            query: graphql`
              query routes_AuctionRouteQuery($id: String!) {
                sale(id: $id) {
                  ...AuctionRoute_sale
                }
              }
            `,
          },
        ],
      },
      {
        path: '/auction/:id',
        Component: AuctionRoute,
        prepareVariables: params => ({
          id: 'shared-live-mocktion-k8s',
        }),
        query: graphql`
          query routes_TopAuctionRouteQuery($id: String!) {
            sale(id: $id) {
              ...AuctionRoute_sale
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
        Component: () => <div>NOT FOUND!</div>,
      },
    ],
  },
]
