import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import { AttributeNames } from '../constants'

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

const AttributeFilters = Object.values(AttributeNames)

function getStyles (name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export function CollectionFilters ({ attributeFilter, setAttributeFilter }) {
  const classes = useStyles()
  const theme = useTheme()

  const handleChange = event => {
    setAttributeFilter(event.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-mutiple-name-label'>Attribute</InputLabel>
        <Select
          labelId='demo-mutiple-name-label'
          id='demo-mutiple-name'
          multiple
          value={attributeFilter}
          onChange={handleChange}
          input={<Input />}
          MenuProps={MenuProps}
        >
          {AttributeFilters.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, attributeFilter, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-mutiple-chip-label'>Chip</InputLabel>
        <Select
          labelId='demo-mutiple-chip-label'
          id='demo-mutiple-chip'
          multiple
          value={attributeFilter}
          input={<Input id='select-multiple-chip' />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {/* {AttributeFilters.map(name => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, attributeFilter, theme)}
            >
              {name}
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>
    </div>
  )
}
