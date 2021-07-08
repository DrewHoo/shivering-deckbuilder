import React from 'react'
import _ from 'lodash'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Text
} from 'recharts'
import Typography from '@material-ui/core/Typography'

const colors = ['8da1b9', '95adb6', 'cbb3bf', '1b4965', 'ef959c', '3f3244']

export function VizBarChart ({ data }) {
  return (
    <ResponsiveContainer height={400}>
      <BarChart
        // width={150}
        // height={40}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        // barSize={20}
      >
        <XAxis dataKey='name' tick={<CustomizedAxisTick />} />
        <YAxis allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {_.uniq(
          data.flatMap(({ name, items, ...datum }) => Object.keys(datum))
        ).map((bar, i) => (
          <Bar key={bar} dataKey={bar} stackId='a' fill={`#${colors[i]}`} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

// line-height: 1;
// font-size: .7rem;

function CustomTooltip ({ active, payload, label }) {
  if (active && payload && payload.length) {
    return payload[0].payload.items.map(({ Name }) => (
      <Typography key={Name} variant='body2'>
        {Name}
      </Typography>
    ))
  }

  return null
}

function CustomizedAxisTick ({ x, y, payload }) {
  return (
    <Text x={x} y={y} width={75} textAnchor='middle' verticalAnchor='start'>
      {payload.value}
    </Text>
  )
}
