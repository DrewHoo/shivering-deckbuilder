import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AttributePieGraph } from './AttributePieGraph'
import { DeckList } from './DeckList/DeckList'
import { CurveDiagram } from './CurveDiagram'
import { KeywordPieGraph } from './KeywordPieGraph'
import { MechanicPieGraph } from './MechanicPieGraph'
import { SetPieGraph } from './SetPieGraph'
import Grid from '@material-ui/core/Grid'
import SimpleCard from './Card'
import { getCardsFromDeckCode } from './deck-analyzer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export default function DeckDetail ({ deckCode, addCard, removeCard }) {
  const classes = useStyles()
  const cardList = getCardsFromDeckCode(deckCode)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SimpleCard title='Card List'>
            <DeckList
              cardList={cardList}
              addCard={addCard}
              removeCard={removeCard}
            />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Curve'>
            <CurveDiagram cardList={cardList} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Attributes'>
            <AttributePieGraph cardList={cardList} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Keywords'>
            <KeywordPieGraph cardList={cardList} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Expansion Set'>
            <SetPieGraph cardList={cardList} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Mechanics'>
            <MechanicPieGraph cardList={cardList} />
          </SimpleCard>
        </Grid>
      </Grid>
    </div>
  )
}
