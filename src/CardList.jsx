import _ from 'lodash'
import React from 'react'
import './CardList.css'

export const CardList = ({ cardList }) => {
  const counts = _.countBy(cardList, 'Name')
  return (
    <div className='CardList'>
      <ul>
        {Object.entries(counts).map(([cardName, cardCount]) => (
          <li className="CardList-item" key={cardName}>
            {cardName} {cardCount}
          </li>
        ))}
      </ul>
    </div>
  )
}
