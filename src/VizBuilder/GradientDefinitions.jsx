import React from 'react'
import { AttributeToColorMap } from './VizPieChart'

export const GradientDefinitions = () => {
  return (
    <defs>
      <linearGradient id='Battlemage'>
        <stop stopColor={AttributeToColorMap.strength} offset='0%' />
        <stop stopColor={AttributeToColorMap.intelligence} offset='50%' />
      </linearGradient>
      <linearGradient id='Tribunal'>
        <stop stopColor={AttributeToColorMap.intelligence} offset='0%' />
        <stop stopColor={AttributeToColorMap.willpower} offset='50%' />
        <stop stopColor={AttributeToColorMap.endurance} offset='100%' />
      </linearGradient>
    </defs>
  )
}
