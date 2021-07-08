import React from 'react'
import { PieGraph } from '../components/PieGraph'

export const AttributeToColorMap = {
  strength: '#e32222',
  willpower: '#e8db23',
  intelligence: '#154aeb',
  agility: '#2e9e53',
  endurance: '#88469c',
  neutral: '#b5b3b3'
}

export function VizPieChart ({ data, dimension }) {
  console.log({ data, dimension })
  data.forEach(datum => {
    datum.count = datum[dimension]
    if (dimension === 'Attributes') {
      datum.color = AttributeToColorMap[datum.name]
    }
  })

  return <PieGraph data={data} nameKey={dimension} dataKey={'count'} />
}
