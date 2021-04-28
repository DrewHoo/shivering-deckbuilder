import React from 'react'
import _ from 'lodash'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%'
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

function getStyles (item, selectedItems, theme) {
  return {
    fontWeight:
      selectedItems.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  }
}

export function AllowedItemsPicker ({
  allItems,
  allowedItems,
  setAllowedItems,
  itemType,
  title
}) {
  const classes = useStyles()
  const theme = useTheme()
  const handleChange = event => {
    const {
      target: { value }
    } = event
    setAllowedItems(value)
  }
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={`deckbuilder-rules-allowed-${itemType}-picker`}>
        {title}
      </InputLabel>
      <Select
        labelId={`deckbuilder-rules-allowed-${itemType}-picker`}
        id={`deckbuilder-rules-allowed-${itemType}-picker-label`}
        multiple
        value={allowedItems}
        onChange={handleChange}
        input={<Input id={`deckbuilder-rules-select-allowed-${itemType}`} />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip
                onMouseDown={event => {
                  event.stopPropagation()
                }}
                key={value}
                label={value}
                className={classes.chip}
                onDelete={() => setAllowedItems(_.without(allowedItems, value))}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {Object.values(allItems).map(item => (
          <MenuItem
            key={item}
            value={item}
            style={getStyles(item, allowedItems, theme)}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
