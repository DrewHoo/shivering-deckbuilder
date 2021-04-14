import React from 'react'
import _ from 'lodash'
import { PieGraph } from './components/PieGraph'
import { KeywordNames } from './constants'

export function KeywordPieGraph ({ cardList }) {
  const nameKey = 'keyword';
  const keywordCountDictionary = _.countBy(
    cardList
      .map(({ Keywords, ...card }) => ({
        ...card,
        Keywords: Keywords.split(',').filter(isKeyword)
      }))
      .flatMap(card =>
        // make a copy of the card for each keyword it has
        // not my fav approach but idk
        card.Keywords.length
          ? card.Keywords.map(keyword => ({ ...card, Keywords: keyword }))
          : [{ ...card, Keywords: 'None' }]
      ),
    'Keywords'
  )

  const data = Object.entries(keywordCountDictionary).map(
    ([value, count]) => ({ [nameKey]: value, count })
  )

  return <PieGraph data={data} nameKey={nameKey} dataKey={'count'} />
}

function isKeyword (word) {
  return Object.keys(KeywordNames).includes(word)
}
