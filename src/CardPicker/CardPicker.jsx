import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { Fab, NativeSelect, Typography } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { CollectionFilters } from './CollectionFilters'
import { cards } from '../collection'
import { trackCardAdded } from '../tracker'
import { CollectionList } from './CollectionList'

export function CardPicker ({ addCard }) {
  const [currentCard, setCurrentCard] = useState('')

  const [attributeFilter, setAttributeFilter] = useState([])
  const [filteredCards, setFilteredCards] = useState(cards)

  useEffect(() => {
    let filteredList = cards

    if (attributeFilter.length) {
      filteredList = cards.filter(({ Attributes }) =>
        attributeFilter.every(attribute =>
          Attributes.includes(attribute.toLowerCase())
        )
      )
    }
    setFilteredCards(filteredList)
  }, [attributeFilter])

  return (
    <>
      <Typography>Find a Card To Add:</Typography>
      <Toolbar>
        <CollectionFilters
          attributeFilter={attributeFilter}
          setAttributeFilter={setAttributeFilter}
        />
      </Toolbar>
      {filteredCards && (
        <CollectionList cards={filteredCards} addCard={addCard} />
      )}
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
