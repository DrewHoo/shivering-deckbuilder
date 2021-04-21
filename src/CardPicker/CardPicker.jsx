import React, { useState, useEffect } from 'react'
import { Toolbar } from '@material-ui/core'
import { CollectionFilters } from './CollectionFilters'
import { cards } from '../collection'
import { CollectionList } from './CollectionList'

export function CardPicker ({ addCard }) {
  const [attributeFilter, setAttributeFilter] = useState([])
  const [costFilter, setCostFilter] = useState([])
  const [filteredCards, setFilteredCards] = useState(cards)
  const [activeSearchFilter, setActiveSearchFilter] = useState('')

  useEffect(() => {
    let filteredList = cards

    if (attributeFilter.length) {
      filteredList = cards.filter(({ Attributes }) =>
        attributeFilter.every(attribute =>
          Attributes.includes(attribute.toLowerCase())
        )
      )
    }
    if (costFilter.length) {
      filteredList = filteredList.filter(card =>
        costFilter.every(cost => card['Magicka Cost'] === String(cost))
      )
    }
    if (activeSearchFilter) {
      filteredList = filteredList.filter(
        ({ Text, Name }) =>
          Text.toLowerCase().includes(activeSearchFilter.toLowerCase()) ||
          Name.toLowerCase().includes(activeSearchFilter.toLowerCase())
      )
    }
    setFilteredCards(filteredList)
  }, [attributeFilter, costFilter, activeSearchFilter])

  return (
    <>
      <Toolbar>
        <CollectionFilters
          attributeFilter={attributeFilter}
          setAttributeFilter={setAttributeFilter}
          costFilter={costFilter}
          setCostFilter={setCostFilter}
          activeSearchFilter={activeSearchFilter}
          setActiveSearchFilter={setActiveSearchFilter}
        />
      </Toolbar>
      {filteredCards && (
        <CollectionList cards={filteredCards} addCard={addCard} />
      )}
    </>
  )
}
