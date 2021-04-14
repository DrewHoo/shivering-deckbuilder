import React from 'react'
import './CardList.css'

export const CardList = ({ cardList }) => {
  return (
    <div className='CardList'>
      <ul>
        {cardList.map(card => (
          <li key={card.code}>{card.Name}</li>
        ))}
      </ul>
    </div>
  )
}
