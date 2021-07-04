import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {
    minWidth: '10vw'
  }
})

export function CollectionStats ({ cardList }) {
  const classes = useStyles()

  const rows = [
    {
      name: 'Total Cards', value: cardList.length
    },
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
