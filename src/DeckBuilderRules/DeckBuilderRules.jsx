import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import { IconButton } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'

import { isDeckCodeValid } from '../DeckCodeUtils/deck-validator'
import { AllowedItemsPicker } from './AllowedItemsPicker'
import { ExpansionSets, Rarities } from '../constants'

const useStyles = makeStyles({
  root: {
    minHeight: '20vh',
    padding: '16px',
    height: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  cardContent: {
    height: '100%'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
})

function useShortSetName (setName) {
  switch (setName) {
    case ExpansionSets.CoreSet:
      return 'Core'
    case ExpansionSets.ForgottenHeroCollection:
      return 'FHC'
    case ExpansionSets.FallOfTheDarkBrotherhood:
      return 'FotDB'
    case ExpansionSets.ReturnToClockworkCity:
      return 'RtCC'
    case ExpansionSets.HeroesOfSkyrim:
      return 'HoS'
    case ExpansionSets.MadhouseCollection:
      return 'MHC'
    case ExpansionSets.HousesOfMorrowind:
      return 'HoM'
    case ExpansionSets.IsleOfMadness:
      return 'IoM'
    case ExpansionSets.AllianceWar:
      return 'AW'
    case ExpansionSets.MoonsOfElsweyr:
      return 'MoE'
    case ExpansionSets.JawsOfOblivion:
      return 'Jaws'
    case ExpansionSets.MonthlyReward:
      return 'Monthly'
    case ExpansionSets.FrostSparkCollection:
      return 'FSC'
    case ExpansionSets.TamrielCollection:
      return 'TC'
    default:
      return ''
  }
}

export function DeckBuilderRules ({ deckCode }) {
  const classes = useStyles()
  const [errors, setErrors] = useState([])
  const [ruleMenuIsOpen, setRuleMenuOpen] = useState(false)
  const [maxNumCopies, setMaxNumCopies] = useState(3)
  const [minDeckSize, setMinDeckSize] = useState(50)
  const [minTriColorDeckSize, setMinTriColorDeckSize] = useState(75)
  const [allowedSets, setAllowedSets] = useState(Object.values(ExpansionSets))
  const [allowedRarities, setAllowedRarities] = useState(
    Object.values(Rarities)
  )
  const rows = [
    { name: 'Max Copies', value: maxNumCopies },
    { name: 'Min Deck Size', value: `${minDeckSize}/${minTriColorDeckSize}` },
    {
      name: 'Allowed Sets',
      value: allowedSets.map(useShortSetName).join(', ')
    },
    { name: 'Allowed Rarities', value: allowedRarities.join(', ') }
  ]

  useEffect(() => {
    const rules = {
      maxNumCopies,
      minDeckSize,
      minTriColorDeckSize,
      allowedSets,
      allowedRarities
    }
    setErrors(isDeckCodeValid(deckCode, rules))
  }, [
    deckCode,
    maxNumCopies,
    minDeckSize,
    minTriColorDeckSize,
    allowedSets,
    allowedRarities,
    setErrors
  ])
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='title'>Deckbuilding Rules</Typography>
            <IconButton onClick={() => setRuleMenuOpen(!ruleMenuIsOpen)}>
              <MenuIcon />
            </IconButton>
          </div>
        }
        subheader={
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {errors.length === 0 && <CheckCircleIcon />}
            {errors.length === 0 && <Typography>Deck is Valid</Typography>}
            {errors.length > 0 && <WarningIcon />}
            {errors.length > 0 && <Typography>{errors.join(', ')}</Typography>}
          </div>
        }
      ></CardHeader>
      <CardContent className={classes.cardContent}>
        {ruleMenuIsOpen && (
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size='small'
              aria-label='deckbuilding rules'
            >
              <TableBody>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <TextField
                      id='outlined-number'
                      size='small'
                      value={maxNumCopies}
                      onChange={event => {
                        const value = parseInt(event.target.value, 10)
                        setMaxNumCopies(value)
                      }}
                      label='Max Copies'
                      type='number'
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant='outlined'
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <TextField
                      id='outlined-number'
                      size='small'
                      value={minDeckSize}
                      onChange={event => {
                        const value = parseInt(event.target.value, 10)
                        setMinDeckSize(value)
                      }}
                      label='Min Deck Size'
                      type='number'
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant='outlined'
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <TextField
                      id='outlined-number'
                      size='small'
                      value={minTriColorDeckSize}
                      onChange={event => {
                        const value = parseInt(event.target.value, 10)
                        setMinTriColorDeckSize(value)
                      }}
                      label='Min Deck Size (Tricolor)'
                      type='number'
                      InputLabelProps={{
                        shrink: true
                      }}
                      variant='outlined'
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <AllowedItemsPicker
                      title='Allowed Sets'
                      itemType='set'
                      allItems={Object.values(ExpansionSets)}
                      setAllowedItems={setAllowedSets}
                      allowedItems={allowedSets}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component='th' scope='row'>
                    <AllowedItemsPicker
                      title='Allowed Rarities'
                      itemType='rarity'
                      allItems={Object.values(Rarities)}
                      setAllowedItems={setAllowedRarities}
                      allowedItems={allowedRarities}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {!ruleMenuIsOpen && (
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              size='small'
              aria-label='deckbuilding rules'
            >
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
        )}
      </CardContent>
    </Card>
  )
}
