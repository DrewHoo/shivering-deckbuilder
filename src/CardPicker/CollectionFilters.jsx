import React from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Chip from '@material-ui/core/Chip'
import { AttributeNames } from '../constants'
import { trackFilterAdded, trackFilterRemoved } from '../tracker'
import { Divider, TextField, Typography } from '@material-ui/core'
import { CollectionFilter } from '../components/CollectionFilter'

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

const AttributeFilters = Object.values(AttributeNames)
const CostFilters = [..._.range(0, 14), 20]

export function CollectionFilters ({
  attributeFilter,
  setAttributeFilter,
  costFilter,
  setCostFilter,
  activeSearchFilter,
  setActiveSearchFilter
}) {
  const classes = useStyles()

  const handleAttributeFilterChange = event => {
    const {
      target: { value: newFilter }
    } = event
    if (newFilter.length > attributeFilter.length) {
      const [filterValue] = _.difference(newFilter, attributeFilter)
      trackFilterAdded(`Attribute: ${filterValue}`)
    } else {
      const [filterValue] = _.difference(attributeFilter, newFilter)
      trackFilterRemoved(`Attribute: ${filterValue}`)
    }
    setAttributeFilter(event.target.value)
  }

  const handleCostFilterChange = event => {
    const {
      target: { value: newFilter }
    } = event
    if (newFilter.length > costFilter.length) {
      const [filterValue] = _.difference(newFilter, costFilter)
      trackFilterAdded(`Cost: ${filterValue}`)
    } else {
      const [filterValue] = _.difference(costFilter, newFilter)
      trackFilterRemoved(`Cost: ${filterValue}`)
    }
    setCostFilter(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <TextField
          id='outlined-helperText'
          label='Search'
          defaultValue=''
          helperText='Hit enter to add this as a filter'
          variant='outlined'
          onChange={event => setActiveSearchFilter(event.target.value)}
        />
      </FormControl>
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
        <Typography id='demo-mutiple-chip-label'>Active Filters</Typography>
        <div className={classes.chips}>
          {[
            ...attributeFilter.map(value => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                onDelete={() =>
                  setAttributeFilter(_.without(attributeFilter, value))
                }
              />
            )),
            ...costFilter.map(value => (
              <Chip
                key={value}
                label={value}
                className={classes.chip}
                onDelete={() => setCostFilter(_.without(costFilter, value))}
              />
            ))
          ]}
        </div>
      </FormControl>
      <Divider />
    </div>
  )
}
