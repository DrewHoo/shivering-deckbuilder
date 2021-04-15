import React, { useState } from 'react'
import _ from 'lodash'
import { Fab, NativeSelect } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { cards } from './collection'
import { trackCardAdded } from './tracker'

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
        <NativeSelect
          value={currentCard.Name}
          onChange={handleChange}
          classes='CardPicker-select'
        >
          <option aria-label='None' value='' />
          {cards.map(card => (
            <option key={card.Name} value={card.Name}>
              {card.Name}
            </option>
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
            onClick={() => {
              trackCardAdded(currentCard.Name)
              addCard(currentCard)
            }}
          >
            <AddIcon />
          </Fab>
        </label>
      )}
    </>
  )
}
