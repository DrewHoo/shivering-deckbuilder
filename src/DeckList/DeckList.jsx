import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { List } from '@material-ui/core'
import { useWidth } from '../Utils/useWidthHook'
import './DeckList.css'
import { DeckListCard } from './DeckListCard'

const useStyles = makeStyles(theme => ({
  cardColumns: { display: 'flex' },
  root: {
    margin: '0 0.5rem'
  }
}))

function getNumberOfColumns (width) {
  switch (width) {
    case 'xl':
      return 5
    case 'lg':
      return 4
    case 'md':
      return 3
    case 'sm':
      return 2
    case 'xs':
    default:
      return 1
  }
}

export const DeckList = ({ cardList, handleClickOpen }) => {
  const classes = useStyles()
  const width = useWidth()
  const numColumns = getNumberOfColumns(width)
  const [cardsByCount, setCardsByCount] = useState([])
  const [columns, setColumns] = useState([])
  useEffect(() => {
    setCardsByCount(
      Object.entries(
        cardList.sort(decklistCardComparator).reduce((acc, next) => {
          if (acc[next.Name]) {
            return {
              ...acc,
              [next.Name]: {
                ...acc[next.Name],
                count: acc[next.Name].count + 1
              }
            }
          }
          return { ...acc, [next.Name]: { ...next, count: 1 } }
        }, {})
      )
    )
  }, [cardList])

  useEffect(() => {
    const minNumRows = Math.floor(cardsByCount.length / numColumns)
    const maxNumRows = Math.ceil(cardsByCount.length / numColumns)
    const numColumnsWithRemainder = cardsByCount.length % numColumns
    const mutableCopyOfCardsByCount = cardsByCount.slice(0)
    setColumns(
      _.range(1, numColumns + 1).map(columnIndex => {
        return columnIndex <= numColumnsWithRemainder
          ? mutableCopyOfCardsByCount.splice(0, maxNumRows)
          : mutableCopyOfCardsByCount.splice(0, minNumRows)
      })
    )
  }, [cardsByCount, numColumns])

  return (
    <div className={clsx('DeckList', classes.cardColumns)}>
      {columns.map((cards, i) => (
        <List className={classes.root} key={`decklist-column-${i}`} dense>
          {cards.map(([cardName, card], index) => (
            <DeckListCard
              key={cardName}
              card={card}
              handleClickOpen={handleClickOpen}
            />
          ))}
        </List>
      ))}
    </div>
  )
}

function decklistCardComparator (a, b) {
  const costComparison = cardCostComparator(a, b)

  if (costComparison !== 0) {
    return costComparison
  }

  return a.Name.localeCompare(b.Name)
}

export function cardCostComparator (a, b) {
  return parseInt(a['Magicka Cost']) - parseInt(b['Magicka Cost'])
}
