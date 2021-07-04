import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { AttributePieGraph } from '../AttributePieGraph'
import { cards } from '../collection'
import { CurveDiagram } from '../CurveDiagram'
import { filterByCollection } from '../DeckCodeUtils/deck-analyzer'
import { KeywordPieGraph } from '../KeywordPieGraph'
import { MechanicPieGraph } from '../MechanicPieGraph'
import { CollectionStats } from '../CollectionStats'
import { SetPieGraph } from '../SetPieGraph'
import Grid from '@material-ui/core/Grid'
import SimpleCard from '../Card'
import { cardAttributesMatchAttributeFilter } from '../CardPicker/cardAttributesMatchAttributeFilter'
import { pickerCardComparator } from '../CardPicker/CardPicker'
import { makeStyles } from '@material-ui/core'
import { Filters } from './Filters'
import { MetaRaces } from '../constants'

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

export const CollectionView = () => {
  const classes = useStyles()
  const [filteredCards, setFilteredCards] = useState(cards)
 

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction='row' justify='center'>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Quick Stats'>
            <CollectionStats cardList={filteredCards} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Filters'>
            <Filters
              setFilteredCards={setFilteredCards}
              cards={cards}
            />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Curve'>
            <CurveDiagram cardList={filteredCards} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Attributes'>
            <AttributePieGraph cardList={filteredCards} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Keywords'>
            <KeywordPieGraph cardList={filteredCards} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Expansion Set'>
            <SetPieGraph cardList={filteredCards} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Mechanics'>
            <MechanicPieGraph cardList={filteredCards} />
          </SimpleCard>
        </Grid>
      </Grid>
    </div>
  )
}
