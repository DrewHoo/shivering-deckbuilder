import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import DeckBuilder from './DeckBuilder'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'

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

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className='App'>
          <Routes>
            <Route path='/' element={<DeckBuilder />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App
