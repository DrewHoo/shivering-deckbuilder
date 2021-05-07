import React, { useState, useEffect } from 'react'
// import { Toolbar } from '@material-ui/core'
import { CollectionFilters } from './CollectionFilters'
import { cards } from '../collection'
import { CollectionList } from './CollectionList'
import { cardCostComparator } from '../DeckList/DeckList'
import { filterByCollection } from '../DeckCodeUtils/deck-analyzer'

export function CardPicker ({ addCard }) {
  const [attributeFilter, setAttributeFilter] = useState([])
  const [costFilter, setCostFilter] = useState([])
  const [filteredCards, setFilteredCards] = useState(cards)
  const [activeSearchFilter, setActiveSearchFilter] = useState('')
  const [userCollection, setUserCollection] = useState('')

  useEffect(() => {
    let filteredList = cards.sort(pickerCardComparator)

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
    if (userCollection) {
      filteredList = filterByCollection(filteredList, userCollection)
    }
    setFilteredCards(filteredList)
  }, [attributeFilter, costFilter, activeSearchFilter, userCollection])

  return (
    <>
      {/* <Toolbar> */}
      <CollectionFilters
        setUserCollection={setUserCollection}
        attributeFilter={attributeFilter}
        setAttributeFilter={setAttributeFilter}
        costFilter={costFilter}
        setCostFilter={setCostFilter}
        activeSearchFilter={activeSearchFilter}
        setActiveSearchFilter={setActiveSearchFilter}
      />
      {/* </Toolbar> */}
      {filteredCards && (
        <CollectionList cards={filteredCards} addCard={addCard} />
      )}
    </>
  )
}

const AttributeOrdering = {
  strength: 1,
  willpower: 2,
  intelligence: 3,
  agility: 4,
  endurance: 5,
  neutral: 6
}

function pickerCardComparator (a, b) {
  if (a.Attributes[0] === 'neutral' || b.Attributes[0] === 'neutral') {
    if (a.Attributes[0] === 'neutral' && b.Attributes[0] === 'neutral') {
      return cardCostComparator(a, b)
    }
    return a.Attributes[0] === 'neutral' ? 1 : -1
  }

  if (a.Attributes.length > 1 && b.Attributes.length > 1) {
    return cardCostComparator(a, b)
  }

  if (a.Attributes.length > 1 || b.Attributes.length > 1) {
    return a.Attributes.length > 1 ? 1 : -1
  }

  if (a.Attributes[0] === b.Attributes[0]) {
    return cardCostComparator(a, b)
  }

  return AttributeOrdering[a.Attributes[0]] - AttributeOrdering[b.Attributes[0]]
}
