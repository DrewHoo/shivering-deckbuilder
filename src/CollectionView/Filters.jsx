import React, { useCallback, useState, useEffect } from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'

import {
  AttributeNames,
  CardTypes,
  DualColorClasses,
  MetaRaces,
  Races,
  Rarities,
  TriColorHouses
} from '../constants'
import { trackFilterAdded, trackFilterRemoved } from '../tracker'
import { Divider, FormGroup, TextField, Typography } from '@material-ui/core'
import { CollectionFilter } from '../components/CollectionFilter'
import { FilterChips } from '../CardPicker/FilterChips'
import { pickerCardComparator } from '../CardPicker/CardPicker'
import { cardAttributesMatchAttributeFilter } from '../CardPicker/cardAttributesMatchAttributeFilter'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  },
  noLabel: {
    marginTop: theme.spacing(3)
  }
}))

const AttributeFilters = [
  ...Object.values(AttributeNames),
  ...Object.values(DualColorClasses),
  ...Object.values(TriColorHouses)
]
const CostFilters = [..._.range(0, 14), 20]
const RaceFilters = [...Object.keys(MetaRaces), ...Object.values(Races)]
const CardTypeFilters = Object.values(CardTypes);
const RarityFilters = Object.values(Rarities);

export function Filters ({ setFilteredCards, cards }) {
  const classes = useStyles()

  const [attributeFilter, setAttributeFilter] = useState([])
  const [costFilter, setCostFilter] = useState([])
  const [raceFilter, setRaceFilter] = useState([])
  const [rarityFilter, setRarityFilter] = useState([])
  const [typeFilter, setTypeFilter] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchFilter, setSearchFilter] = useState([])

  useEffect(() => {
    let filteredList = cards.sort(pickerCardComparator)
    if (typeFilter.length) {
      filteredList = filteredList.filter((card) =>
        typeFilter.some(type => card.Type === type)
      )
    }
    if (rarityFilter.length) {
      filteredList = filteredList.filter((card) =>
        rarityFilter.some(rarity => card.Rarity === rarity)
      )
    }
    if (attributeFilter.length) {
      filteredList = filteredList.filter(({ Attributes }) =>
        cardAttributesMatchAttributeFilter(Attributes, attributeFilter)
      )
    }
    if (costFilter.length) {
      filteredList = filteredList.filter(card =>
        costFilter.some(cost => card['Magicka Cost'] === String(cost))
      )
    }
    if (raceFilter.length) {
      filteredList = filteredList.filter(card =>
        raceFilter.some(
          race =>
            card.Race === String(race) || MetaRaces[race].includes(card.Race)
        )
      )
    }
    if (searchText || searchFilter.length) {
      const searchTerms = [...searchFilter]
      if (searchText.length) {
        searchTerms.push(searchText)
      }
      filteredList = filteredList.filter(({ Text, Name, Race, Type, Rarity }) =>
        searchTerms.some(
          searchTerm =>
            Text.toLowerCase().includes(searchTerm.toLowerCase()) ||
            Name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
    setFilteredCards(filteredList)
  }, [
    attributeFilter,
    typeFilter,
    costFilter,
    raceFilter,
    searchText,
    searchFilter,
    rarityFilter,
  ])

  const handleAttributeFilterChange = useCallback(
    makeFilterChangeHandler({
      filter: attributeFilter,
      setFilter: setAttributeFilter,
      type: 'Attribute'
    }),
    [attributeFilter, setAttributeFilter]
  )
  
  const handleRarityFilterChange = useCallback(
    makeFilterChangeHandler({
      filter: rarityFilter,
      setFilter: setRarityFilter,
      type: 'Rarity'
    }),
    [rarityFilter, setRarityFilter]
  )

  const handleTypeFilterChange = useCallback(
    makeFilterChangeHandler({
      filter: typeFilter,
      setFilter: setTypeFilter,
      type: 'Type'
    }),
    [typeFilter, setTypeFilter]
  )

  const handleCostFilterChange = useCallback(
    makeFilterChangeHandler({
      filter: costFilter,
      setFilter: setCostFilter,
      type: 'Cost'
    }),
    [costFilter, setCostFilter]
  )
  const handleRaceFilterChange = useCallback(
    makeFilterChangeHandler({
      filter: raceFilter,
      setFilter: setRaceFilter,
      type: 'Race'
    }),
    [raceFilter, setRaceFilter]
  )

  const handleSearchTermFilterAdded = useCallback(
    event => {
      if (event.key === 'Enter') {
        event.preventDefault()
        setSearchFilter(_.uniq([...searchFilter, searchText]))
      }
    },
    [searchText, searchFilter, setSearchFilter]
  )

  return (
    <div>
      <FormGroup row>
        <FormControl className={classes.formControl}>
          <TextField
            id='outlined-helperText'
            label='Search'
            defaultValue=''
            helperText='Hit enter to add this as a filter'
            variant='outlined'
            onChange={event => setSearchText(event.target.value)}
            onKeyPress={handleSearchTermFilterAdded}
          />
        </FormControl>
      </FormGroup>
      <Divider />
      <FormControl className={classes.formControl}>
        <CollectionFilter
          filterName='Attribute'
          value={attributeFilter}
          handleChange={handleAttributeFilterChange}
          values={AttributeFilters}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <CollectionFilter
          filterName='Cost'
          value={costFilter}
          handleChange={handleCostFilterChange}
          values={CostFilters}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <CollectionFilter
          filterName='Race'
          value={raceFilter}
          handleChange={handleRaceFilterChange}
          values={RaceFilters}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <CollectionFilter
          filterName='CardType'
          value={typeFilter}
          handleChange={handleTypeFilterChange}
          values={CardTypeFilters}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <CollectionFilter
          filterName='Rarity'
          value={rarityFilter}
          handleChange={handleRarityFilterChange}
          values={RarityFilters}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <Typography id='demo-mutiple-chip-label'>Active Filters</Typography>
        <div className={classes.chips}>
          <FilterChips
            filter={attributeFilter}
            setFilter={setAttributeFilter}
            classes={classes.chip}
          />
          <FilterChips
            filter={rarityFilter}
            setFilter={setRarityFilter}
            classes={classes.chip}
          />
          <FilterChips
            filter={costFilter}
            setFilter={setCostFilter}
            classes={classes.chip}
          />
          <FilterChips
            filter={raceFilter}
            setFilter={setRaceFilter}
            classes={classes.chip}
          />
          <FilterChips
            filter={searchFilter}
            setFilter={setSearchFilter}
            classes={classes.chip}
          />
          <FilterChips
            filter={typeFilter}
            setFilter={setTypeFilter}
            classes={classes.chip}
          />
        </div>
      </FormControl>
      <Divider />
    </div>
  )
}

function makeFilterChangeHandler ({ filter, setFilter, type }) {
  return event => {
    const {
      target: { value: newFilter }
    } = event
    if (newFilter.length > filter.length) {
      const [filterValue] = _.difference(newFilter, filter)
      trackFilterAdded(`${type}: ${filterValue}`)
    } else {
      const [filterValue] = _.difference(filter, newFilter)
      trackFilterRemoved(`${type}: ${filterValue}`)
    }
    setFilter(event.target.value)
  }
}
