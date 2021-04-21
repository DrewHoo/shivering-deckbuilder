import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import { IconButton } from '@material-ui/core'
import { trackCardAdded, trackCardRemoved } from '../tracker'

export function CardDetailView ({
  card,
  open,
  handleClose,
  addCard,
  removeCard
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>{card.Name}</DialogTitle>
      <DialogContent>
        <DialogContentText>{card.Text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <IconButton
          color='primary'
          onClick={() => {
            trackCardAdded(card.Name, 'Deck List View')
            addCard(card)
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color='secondary'
          onClick={() => {
            trackCardRemoved(card.Name, 'Deck List View')
            removeCard(card)
          }}
        >
          <RemoveIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  )
}
