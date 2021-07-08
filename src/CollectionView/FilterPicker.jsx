import React, { useState, useEffect, useCallback } from 'react'
import _ from 'lodash'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import {
  AttributeNames,
  CardTypes,
  DualColorClasses,
  ExpansionSets,
  KeywordNames,
  Races,
  Rarities,
  TriColorHouses
} from '../constants'
import { LabeledSelect } from '../components/LabeledSelect'
import { makeStyles, TextField, useTheme } from '@material-ui/core'
import { Dimensions, DimensionToVariableTypeMap } from './constants'

const useStyles = makeStyles(theme => ({
  control: { margin: theme.spacing(0.5), minWidth: 120 },
  secondRow: { display: 'flex', justifyContent: 'flex-end' },
  formGroup: { display: 'flex', justifyContent: 'space-between' },
  textField: { maxWidth: '90px' },
  filterRow: { margin: theme.spacing(2) }
}))

export function FilterPicker ({
  addFilter,
  setSearchTextFilter,
  searchTextFilter
}) {
  const theme = useTheme()
  const classes = useStyles(theme)
  const [property, setProperty] = useState('')
  const [value, setValue] = useState('')
  const [operator, setOperator] = useState('')

  const [operatorOptions, setOperatorOptions] = useState([])
  const [valueOptions, setValueOptions] = useState([])

  const handleSearchTermFilterAdded = useCallback(
    event => {
      if (event.key === 'Enter') {
        event.preventDefault()
        addFilter(searchTextFilter)
      }
    },
    [searchTextFilter, addFilter]
  )

  useEffect(() => {
    const options = getOperatorOptions(property)
    setOperatorOptions(options)
    if (operator && !options.includes(operator)) {
      setOperator(options[0])
    }
  }, [property, operator])

  useEffect(() => {
    const options = getValueOptions(property)
    setValueOptions(options)
  }, [property])

  const onAddFilter = useCallback(
    e => {
      e.preventDefault()
      addFilter({
        property,
        value,
        operator
      })
    },
    [property, value, operator, addFilter]
  )
  useEffect(() => {
    if (
      searchTextFilter?.value &&
      DimensionToVariableTypeMap[property] !== 'String'
    ) {
      setSearchTextFilter(null)
    }
  }, [property, searchTextFilter?.value, setSearchTextFilter])

  const [addButtonDisabled, setAddButtonDisabled] = useState(true)
  useEffect(() => {
    if (property && operator && !_.isNil(value)) {
      setAddButtonDisabled(false)
    } else {
      setAddButtonDisabled(true)
    }
  }, [property, operator, value])

  return (
    <>
      <Grid container className={classes.filterRow}>
        <Grid item xs={12} sm={4}>
          <LabeledSelect
            className={classes.control}
            id='viz-filter'
            selectName='Filter'
            onChange={setProperty}
            menuOptions={Dimensions}
            value={property}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <LabeledSelect
            className={classes.control}
            id='viz-operator'
            selectName='Operator'
            onChange={setOperator}
            menuOptions={operatorOptions}
            value={operator}
          />
        </Grid>
        {DimensionToVariableTypeMap[property] === 'String' && (
          <Grid item xs={12} sm={4}>
            <TextField
              className={classes.textField}
              id='outlined-helperText'
              label='Search'
              defaultValue=''
              variant='outlined'
              onChange={event =>
                setSearchTextFilter({
                  property,
                  operator,
                  value: event.target.value
                })
              }
              onKeyPress={handleSearchTermFilterAdded}
            />
          </Grid>
        )}
        {DimensionToVariableTypeMap[property] !== 'String' && (
          <Grid xs={12} sm={4}>
            <LabeledSelect
              className={classes.control}
              id='viz-value'
              selectName='Value'
              onChange={setValue}
              menuOptions={valueOptions}
              value={value}
            />
          </Grid>
        )}
      </Grid>
      <Grid container className={classes.secondRow}>
        <Grid item>
          <FormControl>
            <Button
              color='secondary'
              aria-label='add filter'
              disabled={addButtonDisabled}
              onClick={onAddFilter}
            >
              Add Filter
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

const EqualityOperators = ['is equal to', 'is not equal to']
const TextOperators = [...EqualityOperators, 'includes', 'does not include']
const NumericOperators = [
  ...EqualityOperators,
  'is greater than',
  'is less than'
]
const CategoricalOperators = ['includes', 'does not include', 'includes only']

function getOperatorOptions (filter) {
  switch (filter) {
    case 'Name':
    case 'Text':
      return TextOperators
    case 'Attributes':
    case 'Rarity':
    case 'Race':
    case 'Keywords':
    case 'Type':
    case 'Expansion Set':
      return CategoricalOperators
    case 'Magicka Cost':
    case 'Attack':
    case 'Health':
      return NumericOperators
    default:
      console.error(`error: ${filter} is not a valid filter property`)
      return []
  }
}

function getValueOptions (filter) {
  switch (filter) {
    case 'Name':
    case 'Text':
      return []
    case 'Attributes':
      return [
        ...Object.values(AttributeNames),
        ...Object.values(DualColorClasses),
        ...Object.values(TriColorHouses)
      ]
    case 'Rarity':
      return Object.values(Rarities)
    case 'Race':
      return Object.values(Races)
    case 'Keywords':
      return Object.values(KeywordNames)
    case 'Type':
      return Object.values(CardTypes)
    case 'Expansion Set':
      return Object.values(ExpansionSets)
    case 'Magicka Cost':
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 20]
    case 'Attack':
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    case 'Health':
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    default:
      console.error(`error: ${filter} is not a valid filter property`)
      return []
  }
}
