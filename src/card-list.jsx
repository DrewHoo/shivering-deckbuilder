import React from 'react'
import { getCardsFromDeckCode } from './deck-analyzer'

export const CardList = ({ deckCode }) => {
  const cardList = getCardsFromDeckCode(deckCode)
  console.log('deck code', cardList)
  return (
    <ul>
      {cardList.map(card => (
        <li key={card.code}>{card.Name}</li>
      ))}
    </ul>
  )
}
