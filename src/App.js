import React from 'react'
import { useRoutes } from 'hookrouter'
import './App.css'
import DeckBuilder from './DeckBuilder'

const routes = {
  '/': () => <DeckBuilder />
}

function App () {
  const routeResult = useRoutes(routes)

  return <div className='App'>{routeResult}</div>
}

export default App
