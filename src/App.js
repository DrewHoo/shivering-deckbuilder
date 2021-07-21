import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useRoutes } from 'hookrouter'
import './App.css'
import DeckBuilder from './DeckBuilder'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

const routes = {
  '/': () => <DeckBuilder />
}

function App () {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        spacing: 8,
        palette: {
          type: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode]
  )

  const routeResult = useRoutes(routes)

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>{routeResult}</div>
    </MuiThemeProvider>
  )
}

export default App
