import React from 'react'
import { graphql } from 'react-relay'
import { Layout } from './components/Layout'
import { HomeRoute } from './routes/home/HomeRoute'
import { ArtistRoute } from './routes/artist/ArtistRoute'
import { AuctionRoute } from './routes/auction/AuctionRoute'
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
        children: [
          {
            path: '/auction/:id',
            Component: AuctionRoute,
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
          query routes_AuctionRouteQuery($id: String!) {
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
