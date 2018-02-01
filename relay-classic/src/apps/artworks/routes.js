import About from './components/About'
import Artwork from './components/Artwork'
import ArtworkQuery from './queries/ArtworkQuery'
import Layout from './components/Layout'

export default [
  {
    path: '/',
    component: Layout,
    childRoutes: [
      {
        path: 'about',
        component: About
      },
      {
        path: 'artwork/:id',
        component: Artwork,
        queries: ArtworkQuery
      }
    ]
  }
]

/*
// Optional JSX version of routes

import { Route } from 'react-router'

export default (
  <Route path='/' component={Layout}>
    <Route path='about' component={About} />
    <Route path='artwork/:id' component={Artwork} />
  </Route>
)
 */
