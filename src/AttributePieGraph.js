import React from 'react'
import _ from 'lodash'
import { PieGraph } from './components/PieGraph'

const AttributeToColorMap = {
  strength: '#e32222',
  willpower: '#e8db23',
  intelligence: '#154aeb',
  agility: '#2e9e53',
  endurance: '#88469c',
  neutral: '#b5b3b3'
}

export function AttributePieGraph ({ cardList }) {
  const nameKey = 'attribute'
  const keywordCountDictionary = _.countBy(
    cardList.flatMap(card =>
      card.Attributes.map(Attribute => ({ ...card, Attribute }))
    ),
    'Attribute'
  )

  const data = Object.entries(keywordCountDictionary).map(([value, count]) => ({
    [nameKey]: value,
    count,
    color: AttributeToColorMap[value]
  }))

  return <PieGraph data={data} nameKey={nameKey} dataKey={'count'} />
}
