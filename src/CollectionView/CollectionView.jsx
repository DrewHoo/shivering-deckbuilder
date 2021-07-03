import React, { useEffect, useState } from 'react'
import { AttributePieGraph } from '../AttributePieGraph'
import { cards } from '../collection'
import { CurveDiagram } from '../CurveDiagram'
import { filterByCollection } from '../DeckCodeUtils/deck-analyzer'
import { KeywordPieGraph } from '../KeywordPieGraph'
import { MechanicPieGraph } from '../MechanicPieGraph'
import { QuickStats } from '../QuickStats'
import { SetPieGraph } from '../SetPieGraph'
import Grid from '@material-ui/core/Grid'
import SimpleCard from '../Card'
import { cardAttributesMatchAttributeFilter } from '../CardPicker/cardAttributesMatchAttributeFilter'
import { pickerCardComparator } from '../CardPicker/CardPicker'
import { makeStyles } from '@material-ui/core'
import { CollectionFilters } from '../CardPicker/CollectionFilters'

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
  const [attributeFilter, setAttributeFilter] = useState([])
  const [costFilter, setCostFilter] = useState([])
  const [filteredCards, setFilteredCards] = useState(cards)
  const [searchText, setSearchText] = useState('')
  const [searchFilter, setSearchFilter] = useState([])
  const [userCollection, setUserCollection] = useState('')

  useEffect(() => {
    let filteredList = cards.sort(pickerCardComparator)

    if (attributeFilter.length) {
      filteredList = cards.filter(({ Attributes }) =>
        cardAttributesMatchAttributeFilter(Attributes, attributeFilter)
      )
    }
    if (costFilter.length) {
      filteredList = filteredList.filter(card =>
        costFilter.some(cost => card['Magicka Cost'] === String(cost))
      )
    }
    if (searchText || searchFilter.length) {
      const searchTerms = [...searchFilter]
      if (searchText.length) {
        searchTerms.push(searchText)
      }
      filteredList = filteredList.filter(({ Text, Name, Race, Type }) =>
        searchTerms.some(
          searchTerm =>
            Text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Race.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Type.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
    if (userCollection) {
      filteredList = filterByCollection(filteredList, userCollection)
    }
    setFilteredCards(filteredList)
  }, [attributeFilter, costFilter, searchText, userCollection, searchFilter])

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction='row' justify='center'>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Quick Stats'>
            <QuickStats cardList={filteredCards} />
          </SimpleCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SimpleCard title='Filters'>
            <CollectionFilters
              setUserCollection={setUserCollection}
              attributeFilter={attributeFilter}
              setAttributeFilter={setAttributeFilter}
              costFilter={costFilter}
              setCostFilter={setCostFilter}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              setSearchText={setSearchText}
              searchText={searchText}
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
