import React from 'react'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts'

export const CurveDiagram = ({ cardList }) => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map(String)
    .map(cost => {
      let creatureCount
      let nonCreatureCount
      if (cost === 12) {
        creatureCount = cardList.filter(
          card => card['Magicka Cost'] >= cost && card.Type === 'Creature'
        ).length
        nonCreatureCount = cardList.filter(
          card => card['Magicka Cost'] >= cost && card.Type !== 'Creature'
        ).length
      } else {
        creatureCount = cardList.filter(
          card => card['Magicka Cost'] === cost && card.Type === 'Creature'
        ).length
        nonCreatureCount = cardList.filter(
          card => card['Magicka Cost'] === cost && card.Type !== 'Creature'
        ).length
      }
      return {
        name: cost,
        'Creatures': creatureCount,
        'Non-Creatures': nonCreatureCount
      }
    })
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='Creatures' stackId='a' fill='#8884d8' />
        <Bar dataKey='Non-Creatures'  stackId='a' fill='#82ca9d' />
      </BarChart>
    </ResponsiveContainer>
  )
}
