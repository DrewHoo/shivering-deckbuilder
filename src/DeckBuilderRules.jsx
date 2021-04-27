import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning'
import Typography from '@material-ui/core/Typography'
import { isDeckCodeValid } from './deck-analyzer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const ExpansionSets = {
  CoreSet: 'Core Set',
  ForgottenHeroCollection: 'Forgotten Hero Collection',
  FallOfTheDarkBrotherhood: 'The Fall of the Dark Brotherhood',
  ReturnToClockworkCity: 'Return to Clockwork City',
  HeroesOfSkyrim: 'Heroes of Skyrim',
  MadhouseCollection: 'Madhouse Collection',
  HousesOfMorrowind: 'Houses of Morrowind',
  IsleOfMadness: 'Isle of Madness',
  AllianceWar: 'Alliance War',
  MoonsOfElsweyr: 'Moons of Elsweyr',
  JawsOfOblivion: 'Jaws of Oblivion',
  MonthlyReward: 'Monthly Reward',
  FrostSparkCollection: 'FrostSpark Collection'
}

const Rarities = {
  Common: 'Common',
  Rare: 'Rare',
  Epic: 'Epic',
  Legendary: 'Legendary',
  LegendaryUnique: 'Legendary - Unique'
}

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
      return 'Moe'
    case ExpansionSets.JawsOfOblivion:
      return 'Jaws'
    case ExpansionSets.MonthlyReward:
      return 'Monthly'
    case ExpansionSets.FrostSparkCollection:
      return 'FSC'
    default:
      return ''
  }
}

export function DeckBuilderRules ({ deckCode }) {
  const classes = useStyles()
  const [valid, setValid] = useState(false)
  /* eslint-disable no-unused-vars */
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
    setValid(isDeckCodeValid(deckCode, rules))
  }, [
    deckCode,
    maxNumCopies,
    minDeckSize,
    minTriColorDeckSize,
    allowedSets,
    allowedRarities,
    setValid
  ])
  return (
    <Card className={classes.root}>
      <CardHeader title='Deckbuilding Rules'>
        {valid && <CheckCircleIcon />}
        {valid && <Typography>Deck is Valid</Typography>}
        {!valid && <WarningIcon />}
        {!valid && <Typography>Deck is Not Valid</Typography>}
      </CardHeader>
      <CardContent className={classes.cardContent}>
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
      </CardContent>
    </Card>
  )
}
