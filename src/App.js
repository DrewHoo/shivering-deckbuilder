import React, { useState } from 'react'
import './App.css'
import { AttributePieGraph } from './AttributePieGraph'
import { CardList } from './CardList'
import { CardPicker } from './CardPicker'
import { CurveDiagram } from './CurveDiagram'
import { addCardToDeck, getCardsFromDeckCode } from './deck-analyzer'
import { DeckCode } from './DeckCode'
import { KeywordPieGraph } from './KeywordPieGraph'
import { MechanicPieGraph } from './MechanicPieGraph'
import { SetPieGraph } from './SetPieGraph'

function App () {
  const [deckCode, setDeckCode] = useState(
    'SPAUaskwmxnHwAyBjyymfhaAxSjXqhmUflxPkYirwqeaAPbOdhpVnwaNvDcrxcvKdVefbKdEfvdYAKhPqygsnMjHrCoedIrkmG'
  )
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
        <DeckCode setDeckCode={setDeckCode} deckCode={deckCode}/>
        <CardPicker addCard={addCard} />
      </header>
      <div className='App-analytics'>
        {deckCode && <CardList cardList={cardList} />}
        {deckCode && <AttributePieGraph cardList={cardList} />}
        {deckCode && <CurveDiagram cardList={cardList} />}
      </div>
      <div className='App-analytics'>
        {deckCode && <KeywordPieGraph cardList={cardList} />}
        {deckCode && <SetPieGraph cardList={cardList} />}
        {deckCode && <MechanicPieGraph cardList={cardList} />}
      </div>
    </div>
  )
}

export default App
