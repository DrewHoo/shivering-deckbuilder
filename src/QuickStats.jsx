import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { calculateOddsOfDrawingKCard } from './chance-to-draw-k'
import { KeywordNames } from './constants'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export function QuickStats ({ cardList }) {
  const classes = useStyles()

  const rows = [
    {
      name: 'Creatures',
      value: cardList.filter(({ Type }) => Type === 'Creature').length
    },
    {
      name: 'Actions',
      value: cardList.filter(({ Type }) => Type === 'Action').length
    },
    {
      name: 'Items',
      value: cardList.filter(({ Type }) => Type === 'Item').length
    },
    {
      name: 'Supports',
      value: cardList.filter(({ Type }) => Type === 'Support').length
    },
    {
      name: 'Opening Play Odds',
      value: calculateOddsOfDrawingKCard(
        cardList.length,
        cardList.filter(
          // eslint-disable-next-line no-useless-computed-key
          ({ Type, ['Magicka Cost']: cost }) =>
            Type === 'Creature' && parseInt(cost, 10) < 2
        ).length,
        6 // it ain't really 6, but I don't know how to do replacement
      )
    },
    {
      name: 'Opening Play Odds (Ring)',
      value: calculateOddsOfDrawingKCard(
        cardList.length,
        cardList.filter(
          // eslint-disable-next-line no-useless-computed-key
          ({ Type, ['Magicka Cost']: cost }) =>
            Type === 'Creature' && parseInt(cost, 10) < 3
        ).length,
        6 // it ain't really 6, but I don't know how to do replacement
      )
    },
    {
      name: 'Odds of One Prophecy',
      value: calculateOddsOfDrawingKCard(
        cardList.length,
        cardList.filter(({ Keywords }) =>
          Keywords.split(',').includes(KeywordNames.Prophecy)
        ).length,
        5 // one card drawn for each rune
      )
    }
  ]

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell align='right'>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
