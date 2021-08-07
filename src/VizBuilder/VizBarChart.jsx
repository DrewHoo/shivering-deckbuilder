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
import { AttributeNames, Classes } from '../constants'
import { AttributeToColorMap } from './VizPieChart'
import {
  makeImageGradient,
  makeNonTransparentGradient
} from '../DeckList/DeckListCard'
import { GradientDefinitions } from './GradientDefinitions'

// generated here: https://coolors.co/843b62-fc60a8-f67e7d-faedca-7ebc89-8f95d3-16697a-89daff-6b5e62-1e1e24
const colors = [
  '843b62',
  'fc60a8',
  'f67e7d',
  'faedca',
  '7ebc89',
  '8f95d3',
  '16697a',
  '89daff',
  '6b5e62',
  '1e1e24'
]

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
        <defs>
          <linearGradient id='Battlemage' x1='0' y1='0' x2='1' y2='1'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.strength} offset='50%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='50%' />
          </linearGradient>
          <linearGradient id='Crusader' x1='0' y1='0' x2='1' y2='1'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.strength} offset='50%' />
            <stop stop-color={AttributeToColorMap.willpower} offset='50%' />
          </linearGradient>
          <linearGradient id='Archer' x1='0' y1='0' x2='0.5' y2='1'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.strength} offset='35%' />
            <stop stop-color={AttributeToColorMap.agility} offset='65%' />
          </linearGradient>
          <linearGradient id='Warrior' x1='0' y1='0' x2='1' y2='0'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.strength} offset='50%' />
            <stop stop-color={AttributeToColorMap.endurance} offset='50%' />
          </linearGradient>
          <linearGradient id='Mage' x1='0' y1='0' x2='1' y2='1'>
            <stop stop-color={AttributeToColorMap.intelligence} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='50%' />
            <stop stop-color={AttributeToColorMap.willpower} offset='50%' />
          </linearGradient>
          <linearGradient id='Assassin' x1='0' y1='0' x2='1' y2='1'>
            <stop stop-color={AttributeToColorMap.intelligence} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='50%' />
            <stop stop-color={AttributeToColorMap.agility} offset='50%' />
          </linearGradient>
          <linearGradient id='Sorcerer'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='50%' />
          </linearGradient>
          <linearGradient id='Monk'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='50%' />
          </linearGradient>
          <linearGradient id='Spellsword'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='50%' />
          </linearGradient>
          <linearGradient id='Scout'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='50%' />
          </linearGradient>
          <linearGradient id='Tribunal'>
            <stop stop-color={AttributeToColorMap.intelligence} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='17%' />
            <stop stop-color={AttributeToColorMap.willpower} offset='41%' />
            <stop stop-color={AttributeToColorMap.willpower} offset='59%' />
            <stop stop-color={AttributeToColorMap.endurance} offset='83%' />
            <stop stop-color={AttributeToColorMap.endurance} offset='100%' />
          </linearGradient>
          <linearGradient id='Guildsworn'>
            <stop stop-color={AttributeToColorMap.strength} offset='0%' />
            <stop stop-color={AttributeToColorMap.strength} offset='17%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='41%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='59%' />
            <stop stop-color={AttributeToColorMap.willpower} offset='83%' />
            <stop stop-color={AttributeToColorMap.willpower} offset='100%' />
          </linearGradient>
          <linearGradient id='Telvanni'>
            <stop stop-color={AttributeToColorMap.intelligence} offset='0%' />
            <stop stop-color={AttributeToColorMap.intelligence} offset='17%' />
            <stop stop-color={AttributeToColorMap.agility} offset='41%' />
            <stop stop-color={AttributeToColorMap.agility} offset='59%' />
            <stop stop-color={AttributeToColorMap.endurance} offset='83%' />
            <stop stop-color={AttributeToColorMap.endurance} offset='100%' />
          </linearGradient>
          {[
            [
              'Telvanni',
              AttributeToColorMap.intelligence,
              AttributeToColorMap.agility,
              AttributeToColorMap.endurance
            ]
          ].map((name, color1, color2, color3) =>
            makeLinearGradient(name, color1, color2, color3)
          )}
        </defs>
        <XAxis dataKey='name' tick={<CustomizedAxisTick />} />
        <YAxis allowDecimals={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {/* <Bars data={data} /> */}
        {_.uniq(
          data.flatMap(({ name, items, ...datum }) => Object.keys(datum))
        ).map((bar, i) => (
          <Bar key={bar} dataKey={bar} stackId='a' fill={getColor(bar, i)} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  )
}

function makeLinearGradient (name, color1, color2, color3) {
  return (
    <linearGradient id={name} key={name}>
      <stop stopColor={color1} offset='0%' />
      <stop stopColor={color1} offset='17%' />
      <stop stopColor={color2} offset='41%' />
      <stop stopColor={color2} offset='59%' />
      <stop stopColor={color3} offset='83%' />
      <stop stopColor={color3} offset='100%' />
    </linearGradient>
  )
}

function getColor (bar, index) {
  if (
    Object.values(AttributeNames)
      .map(str => str.toLowerCase())
      .includes(bar.toLowerCase())
  ) {
    return `${AttributeToColorMap[bar.toLowerCase()]}`
  }
  if (
    Object.values(Classes)
      .map(str => str.toLowerCase())
      .includes(bar.toLowerCase())
  ) {
    return `url(#${bar})`
  }
  return `#${colors[index]}`
}

// line-height: 1;
// font-size: .7rem;

function CustomTooltip ({ active, payload, label }) {
  if (active && payload && payload.length) {
    return payload[0].payload.items.map(({ Name }) => (
      <Typography key={label + Name} variant='body2'>
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
