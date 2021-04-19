import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { Toolbar } from '@material-ui/core'
import { CollectionFilters } from './CollectionFilters'
import { cards } from '../collection'
import { CollectionList } from './CollectionList'

export function CardPicker ({ addCard }) {
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
    </>
  )
}
