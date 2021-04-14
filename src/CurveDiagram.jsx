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
  const data = [0, 1, 2, 3, 4, 5, 6, 7].map(String).map(cost => {
    return {
      name: cost,
      value: cardList.filter(card => card['Magicka Cost'] === cost).length
    }
  })
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <BarChart width={150} height={40} data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='value' fill='#8884d8' />
      </BarChart>
    </ResponsiveContainer>
  )
}
