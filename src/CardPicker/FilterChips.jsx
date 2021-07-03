import _ from 'lodash'
import React from 'react'
import Chip from '@material-ui/core/Chip'

export const FilterChips = ({ setFilter, filter, classes }) => {
  return filter.map(value => (
    <Chip
      key={value}
      label={value}
      className={classes}
      onDelete={() => setFilter(_.without(filter, value))}
    />
  ))
}
