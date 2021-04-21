import React from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useTheme } from '@material-ui/core/styles'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

function getStyles (name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export function CollectionFilter ({ value, handleChange, values, filterName }) {
  const theme = useTheme()
  return (
    <>
      <InputLabel id={`${filterName}-collection-filter`}>
        {filterName}
      </InputLabel>
      <Select
        labelId={`${filterName}-collection-filter`}
        id={`${filterName}-collection-filter-select`}
        multiple
        value={value}
        onChange={handleChange}
        input={<Input />}
        MenuProps={MenuProps}
      >
        {values.map(name => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, value, theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
