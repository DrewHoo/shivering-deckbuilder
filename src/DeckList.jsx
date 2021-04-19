import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import './DeckList.css'

const useStyles = makeStyles(theme => ({
  cardColumns: { display: 'flex' }
}))

export const DeckList = ({ cardList }) => {
  const classes = useStyles()
  const columns = _.chunk(Object.entries(_.countBy(cardList, 'Name')), 20)
  return (
    <div className={clsx('DeckList', classes.cardColumns)}>
      {columns.map((counts, i) => (
        <ul key={`decklist-column-${i}`}>
          {counts.map(([cardName, cardCount]) => (
            <li className='DeckList-item' key={cardName}>
              {cardName} {cardCount}
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
