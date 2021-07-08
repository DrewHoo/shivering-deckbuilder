import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import { FilterChips } from '../CardPicker/FilterChips'
import { FilterPicker } from './FilterPicker'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
    display: 'flex'
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

export function Filters ({
  setFilters,
  filters,
  searchTextFilter,
  setSearchTextFilter,
  chartType
}) {
  const classes = useStyles()

  const addFilter = useCallback(
    filter => {
      setFilters([...filters, filter])
    },
    [setFilters, filters]
  )

  const removeFilter = useCallback(
    filter => {
      const newFilters = filters.filter(
        f =>
          !(
            f.property === filter.property &&
            f.value === filter.value &&
            f.operator === filter.operator
          )
      )
      setFilters(newFilters)
    },
    [setFilters, filters]
  )

  return (
    <>
      <FilterPicker
        addFilter={addFilter}
        searchTextFilter={searchTextFilter}
        setSearchTextFilter={setSearchTextFilter}
        chartType={chartType}
      />
      <FormControl className={classes.formControl}>
        <div className={classes.chips}>
          <FilterChips
            filter={filters}
            removeFilter={removeFilter}
            classes={classes.chip}
          />
        </div>
      </FormControl>
    </>
  )
}
