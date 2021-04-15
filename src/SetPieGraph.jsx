import React from 'react'
import _ from 'lodash'
import { PieGraph } from './components/PieGraph'

export function SetPieGraph ({ cardList }) {
  const nameKey = 'expansion set'

  const data = Object.entries(_.countBy(cardList, 'Expansion set')).map(
    ([value, count]) => ({
      [nameKey]: value,
      count
    })
  )

  return <PieGraph data={data} nameKey={nameKey} dataKey={'count'} />
}
