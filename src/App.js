import 'babel-polyfill'
import React from 'react'
import { GlobalStyle } from './styles/GlobalStyles'
import { CustomHeader } from './components/CustomHeader'
import { Home } from './pages/Home'
import { Detail } from './pages/Detail'
import { NotFound } from './pages/NotFound'
import { Router } from '@reach/router'

export const App = () => {
  return (
    <div>
      <GlobalStyle />
      <CustomHeader />
      <Router>
        <NotFound default />
        <Home path='/' />
        <Detail path='/detail/' />
        <Detail path='/detail/:userId' />
      </Router>
    </div>
  )
}
