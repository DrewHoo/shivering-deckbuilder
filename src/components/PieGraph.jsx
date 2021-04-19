import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import './PieGraph.css'

const COLORS = [
  '#bce784ff',
  '#ff70c3ff',
  '#fcab64ff',
  '#575d90ff',
  '#01a7c2ff',
  '#7dbbc3ff',
  '#84d2f6ff',
  '#91e5f6ff',
  '#ff715bff'
]

export function PieGraph ({ data, nameKey, dataKey }) {
  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = outerRadius * 1.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
      <text
        className='PieGraph-labeltext'
        x={x}
        y={y}
        fill='black'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {data[index][nameKey]}: {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <ResponsiveContainer width='100%' height={400} className='PieGraph'>
      {/* <ResponsiveContainer className='PieGraph'> */}
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={true}
          outerRadius={80}
          fill='#8884d8'
          nameKey={nameKey}
          dataKey={dataKey}
          label={renderCustomizedLabel}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color ?? COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}
