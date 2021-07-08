import React from 'react'
import _ from 'lodash'
import { cards } from '../collection'
import { VizBarChart } from './VizBarChart'
import { VizPieChart } from './VizPieChart'
import {
  DimensionToVariableTypeMap,
  OrdinalTypeValues
} from '../CollectionView/constants'

export function VizBuilder () {}

export function VizDisplayer ({
  chartType,
  searchTextFilter,
  query: {
    measures,
    dimension = 'Magicka Cost',
    filters = [],
    segment = ''
  } = {}
} = {}) {
  const data = transformQueryToData({
    searchTextFilter,
    query: { dimension, filters, segment }
  })
  switch (chartType) {
    case 'Bar':
      return <VizBarChart data={data} />
    case 'Pie':
      return <VizPieChart data={data} dimension={dimension} />
    default:
      console.error(`error: ${chartType} is not a valid chartType`)
      return null
  }
}

function transformQueryToData ({
  searchTextFilter,
  query: { dimension, filters, segment }
}) {
  return (
    _.chain(cards)
      .filter(card =>
        [...filters, ...(searchTextFilter ? [searchTextFilter] : [])].every(
          filter => filterQuery({ filter, item: card })
        )
      )
      .groupBy(card => card[dimension])
      .toPairs()
      .sortBy(([dimensionValue, cardsOfDimension]) => {
        switch (DimensionToVariableTypeMap[dimension]) {
          case 'Ordinal':
            return OrdinalTypeValues[dimension][dimensionValue]
          case 'Categorical':
            return cardsOfDimension.length * -1
          case 'Numerical':
            return parseInt(dimensionValue, 10)
          default:
            console.error(
              `error: ${DimensionToVariableTypeMap[dimension]} is not a valid variable type`
            )
            return []
        }
      })
      .map(([dimensionValue, cardsOfDimension]) => ({
        name: dimensionValue,
        items: cardsOfDimension,
        ...(segment !== 'None'
          ? segmentItems({ items: cardsOfDimension, segment })
          : { [dimension]: cardsOfDimension.length })
      }))
      // .reverse()
      .value()
  )
}

function segmentItems ({ items, segment }) {
  return _.chain(items)
    .groupBy(segment)
    .mapValues(values => values.length)
    .value()
}

function filterQuery ({ item, filter: { property, operator, value, or } }) {
  switch (operator) {
    case 'is equal to':
      return (
        String(item[property]) === String(value) ||
        (or && filterQuery({ filter: or, item }))
      )
    case 'is not equal to':
      return !(
        String(item[property]) === String(value) ||
        (or && filterQuery({ filter: or, item }))
      )
    case 'includes':
      if (Array.isArray(item[property])) {
        return item[property]
          .map(attr => attr.toLowerCase())
          .includes(value.toLowerCase())
      }
      return item[property].toLowerCase?.().includes(value.toLowerCase())

    case 'does not include':
      return !item[property].toLowerCase?.().includes(value.toLowerCase())

    case 'is greater than':
      return parseInt(item[property], 10) > parseInt(value, 10)
    case 'is less than':
      return parseInt(item[property], 10) < parseInt(value, 10)
    default:
      console.error(`error: ${operator} is not a valid filter operator`)
      return false
  }
}
