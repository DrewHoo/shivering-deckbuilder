import React from 'react'
import { useRoutes } from 'hookrouter'
import './App.css'
import DeckBuilder from './DeckBuilder'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'

const routes = {
  '/': () => <DeckBuilder />
}
const theme = createMuiTheme({
  spacing: 8
})

function App () {
  const routeResult = useRoutes(routes)

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>{routeResult}</div>
    </ThemeProvider>
  )
}

export default App
