import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { Divider, List } from '@material-ui/core'
import { useWidth } from '../Utils/useWidthHook'
import './DeckList.css'
import { DeckListCard } from './DeckListCard'

const useStyles = makeStyles(theme => ({
  cardColumns: { display: 'flex' },
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  }
}))

function getNumberOfColumns (width) {
  switch (width) {
    case 'xl':
    case 'lg':
      return 5
    case 'md':
      return 4
    case 'sm':
      return 3
    case 'xs':
    default:
      return 2
  }
}

export const DeckList = ({ cardList, handleClickOpen }) => {
  const classes = useStyles()
  const width = useWidth()
  const maxNumColumns = getNumberOfColumns(width)
  const cardsByCount = Object.entries(
    cardList.sort(decklistCardSort).reduce((acc, next) => {
      if (acc[next.Name]) {
        return {
          ...acc,
          [next.Name]: { ...acc[next.Name], count: acc[next.Name].count + 1 }
        }
      }
      return { ...acc, [next.Name]: { ...next, count: 1 } }
    }, {})
  )
  const numRowsLastColumn = cardsByCount.length % maxNumColumns
  const numRowsPerColumn =
    (cardsByCount.length - numRowsLastColumn) / maxNumColumns
  const columns = _.chunk(cardsByCount, numRowsPerColumn)

  return (
    <div className={clsx('DeckList', classes.cardColumns)}>
      {columns.map((cards, i) => (
        <List className={classes.root} key={`decklist-column-${i}`} dense>
          {cards.map(([cardName, card], index) => (
            <>
              <DeckListCard
                key={cardName}
                card={card}
                handleClickOpen={handleClickOpen}
              />
              {index !== cards.length - 1 ? (
                <Divider variant='middle' component='li' />
              ) : null}
            </>
          ))}
        </List>
      ))}
    </div>
  )
}

const AttributeOrdering = {
  strength: 1,
  willpower: 2,
  intelligence: 3,
  agility: 4,
  endurance: 5,
  neutral: 6
}

export function decklistCardSort (a, b) {
  if (a.Attributes[0] === 'neutral' || b.Attributes[0] === 'neutral') {
    if (a.Attributes[0] === 'neutral' && b.Attributes[0] === 'neutral') {
      return sortByCost(a, b)
    }
    return a.Attributes[0] === 'neutral' ? 1 : -1
  }
  if (a.Attributes.length > 1 && b.Attributes.length > 1) {
    return sortByCost(a, b)
  }
  if (a.Attributes.length > 1 || b.Attributes.length > 1) {
    return a.Attributes.length > 1 ? 1 : -1
  }
  if (a.Attributes[0] === b.Attributes[0]) {
    return sortByCost(a, b)
  }
  return  AttributeOrdering[a.Attributes[0]] - AttributeOrdering[b.Attributes[0]]
}

function sortByCost (a, b) {
  return parseInt(a['Magicka Cost'], 10) - parseInt(b['Magicka Cost'], 10)
}
