import React, { useState } from 'react'

import './App.css'
import { CardList } from './CardList'
import { CurveDiagram } from './CurveDiagram'
import { getCardsFromDeckCode } from './deck-analyzer'

function App () {
  const [deckCode, setDeckCode] = useState('')
  const handleChange = event => {
    setDeckCode(event.target.value)
  }
  let cardList
  if (deckCode) {
    cardList = getCardsFromDeckCode(deckCode)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <label>
          Enter Deck Code:
          <input
            type='textarea'
            value={deckCode}
            onChange={handleChange}
          ></input>
        </label>
      </header>
      <div className='App-analytics'>
        {deckCode && <CardList cardList={cardList} />}
        {deckCode && <CurveDiagram cardList={cardList} />}
      </div>
    </div>
  )
}

export default App
