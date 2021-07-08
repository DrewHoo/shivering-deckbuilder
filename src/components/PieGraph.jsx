import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
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

const useStyles = makeStyles(theme => ({ labelText: { fontSize: '1em' } }))

export function PieGraph ({ data, nameKey, dataKey }) {
  const classes = useStyles()
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
    const radius = outerRadius * 0.67
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)
    return (
      <text
        className={classes.labelText}
        x={x}
        y={y}
        fill='white'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <ResponsiveContainer height={400} className='PieGraph'>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          labelLine={false}
          outerRadius={150}
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
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
