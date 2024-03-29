import React, { useCallback, useState } from 'react'
import _ from 'lodash'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import { AttributeNames } from '../constants'
import { trackFilterAdded, trackFilterRemoved } from '../tracker'
import {
  Divider,
  FormGroup,
  TextField,
  Typography
} from '@material-ui/core'
import { CollectionFilter } from '../components/CollectionFilter'
import { trackCollectionCodePaste } from '../tracker'
import { mapAltArts } from '../DeckCodeUtils/alt-art-map'
import { FilterChips } from './FilterChips'

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

export const AttributeFilters = [
  ...Object.values(AttributeNames),
  'Battlemage',
  'Crusader',
  'Archer',
  'Warrior',
  'Mage',
  'Assassin',
  'Sorcerer',
  'Monk',
  'Spellsword',
  'Scout',
  'Guildsworn',
  'Dagoth',
  'Daggerfall',
  'Hlaalu',
  'Redoran',
  'Ebonheart',
  'Dominion',
  'Tribunal',
  'Telvanni',
  'Empire'
]
const CostFilters = [..._.range(0, 14), 20]

export function CollectionFilters ({
  setUserCollection,
  attributeFilter,
  setAttributeFilter,
  costFilter,
  setCostFilter,
  searchFilter,
  setSearchFilter, // this is a filter
  setSearchText, // this is what a user is typing
  searchText
}) {
  const classes = useStyles()

  const [isDialogOpen, setDialogOpen] = useState(false)

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
        {/* <FormControlLabel
          className={classes.formControl}
          control={
            <IconButton onClick={() => setDialogOpen(true)}>
              <PlaylistAddIcon />
            </IconButton>
          }
          label='Import Collection'
        />
        <FormControlLabel
          className={classes.formControl}
          control={
            <IconButton onClick={() => setUserCollection('')}>
              <ClearIcon />
            </IconButton>
          }
          label='Clear Collection'
        /> */}
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
        <Typography id='demo-mutiple-chip-label'>Active Filters</Typography>
        <div className={classes.chips}>
          <FilterChips
            filter={attributeFilter}
            setFilter={setAttributeFilter}
            classes={classes.chip}
          />
          <FilterChips
            filter={costFilter}
            setFilter={setCostFilter}
            classes={classes.chip}
          />
          <FilterChips
            filter={searchFilter}
            setFilter={setSearchFilter}
            classes={classes.chip}
          />
        </div>
      </FormControl>
      <Divider />
      <PasteCollectionDeckCodeDialog
        setDeckCode={setUserCollection}
        closeDialog={() => setDialogOpen(false)}
        isDialogOpen={isDialogOpen}
      />
    </div>
  )
}

function PasteCollectionDeckCodeDialog ({
  setDeckCode,
  closeDialog,
  isDialogOpen
}) {
  const [deckCode, updateDeckCode] = useState('')
  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Import Collection</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Paste your collection code (Options -&gt; ℹ️ -&gt; Export Collection)
        </DialogContentText>
        <TextareaAutosize
          aria-label='Collection Code'
          rowsMin={3}
          placeholder='SPAAAAAA'
          autoFocus
          onChange={event => updateDeckCode(event.target.value)}
          margin='dense'
          id='deck-code-paste'
          label='Deck Code'
          type='text'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            trackCollectionCodePaste(deckCode)
            setDeckCode(mapAltArts(deckCode))
            closeDialog()
          }}
          color='primary'
        >
          Import
        </Button>
        <Button onClick={closeDialog} color='secondary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
