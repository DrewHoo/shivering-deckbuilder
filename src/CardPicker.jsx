import React, { useState } from 'react'
import _ from 'lodash'
import { Fab, NativeSelect } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { cards } from './collection'

export function CardPicker ({ addCard }) {
  const [currentCard, setCurrentCard] = useState('')
  const handleChange = e => {
    if (e?.target?.value) {
      setCurrentCard(cards.find(({ Name }) => Name === e.target.value) ?? '')
    }
  }
  return (
    <>
      <label>
        Find a Card To Add:
        <NativeSelect value={currentCard.Name} onChange={handleChange}>
          <option aria-label='None' value='' />
          {cards.map(card => (
            <option value={card.Name}>{card.Name}</option>
          ))}
        </NativeSelect>
      </label>
      {currentCard && (
        <label>
          {JSON.stringify(
            _.pick(currentCard, 'Magicka Cost', 'Attack', 'Health', 'Type'),
            null,
            ' '
          )}
          <Fab
            color='primary'
            aria-label='add'
            onClick={() => addCard(currentCard)}
          >
            <AddIcon />
          </Fab>
        </label>
      )}
    </>
  )
}
