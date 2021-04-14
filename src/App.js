import React, { useState } from 'react'

import './App.css'
import { CardList } from './card-list'

function App () {
  const [deckCode, setDeckCode] = useState(null)
  const handleChange = event => {
    setDeckCode(event.target.value)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <label>
          Enter Deck Code: <input type='textarea' value={deckCode} onChange={handleChange}></input>
        </label>
        <div>{deckCode && <CardList deckCode={deckCode} />}</div>
      </header>
    </div>
  )
}

export default App
