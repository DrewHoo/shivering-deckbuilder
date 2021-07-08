import React from 'react'
import FormControl from '@material-ui/core/FormControl'
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

function getStyles (name, itemName, theme) {
  let fontWeight = theme.typography.fontWeightRegular
  if (typeof itemName === 'number' && itemName === name) {
    fontWeight = theme.typography.fontWeightMedium
  }
  if (typeof itemName === 'string' && itemName.indexOf(name) === -1) {
    fontWeight = theme.typography.fontWeightMedium
  }
  return { fontWeight }
}

export function LabeledSelect ({
  className,
  value,
  onChange,
  selectName,
  id,
  menuOptions = []
}) {
  const theme = useTheme()

  return (
    <FormControl className={className}>
      <InputLabel id={`${id}-picker`}>{selectName}</InputLabel>
      <Select
        labelId={`${id}-picker`}
        id={`${id}-select`}
        value={value}
        onChange={e => {
          e.preventDefault()
          onChange(e.target.value)
        }}
        input={<Input />}
        MenuProps={MenuProps}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {menuOptions.map(name => (
          <MenuItem
            key={name}
            value={name}
            style={getStyles(name, value ?? '', theme)}
          >
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
