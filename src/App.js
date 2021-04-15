import React, { useState } from 'react'
import './App.css'
import { CardList } from './CardList'
import { CardPicker } from './CardPicker'
import { CurveDiagram } from './CurveDiagram'
import { addCardToDeck, getCardsFromDeckCode } from './deck-analyzer'
import { KeywordPieGraph } from './KeywordPieGraph'
import { MechanicPieGraph } from './MechanicPieGraph'
import { SetPieGraph } from './SetPieGraph'

function App () {
  const [deckCode, setDeckCode] = useState(
    'SPAUaskwmxnHwAyBjyymfhaAxSjXqhmUflxPkYirwqeaAPbOdhpVnwaNvDcrxcvKdVefbKdEfvdYAKhPqygsnMjHrCoedIrkmG'
  )
  const handleChange = event => {
    setDeckCode(event.target.value)
  }
  let cardList
  if (deckCode) {
    cardList = getCardsFromDeckCode(deckCode)
  }
  const addCard = card => {
    setDeckCode(addCardToDeck(deckCode, card))
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
        <CardPicker addCard={addCard} />
      </header>
      <div className='App-analytics'>
        {deckCode && <CardList cardList={cardList} />}
        {deckCode && <SetPieGraph cardList={cardList} />}
        {deckCode && <MechanicPieGraph cardList={cardList} />}
        {deckCode && <KeywordPieGraph cardList={cardList} />}
        {deckCode && <CurveDiagram cardList={cardList} />}
      </div>
    </div>
  )
}

export default App
