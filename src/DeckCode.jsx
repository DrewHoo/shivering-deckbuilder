import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import ClearIcon from '@material-ui/icons/Clear'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { trackDeckCodeCopy, trackDeckCodePaste } from './tracker'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { mapAltArts } from './deck-analyzer'

const useStyles = makeStyles({
  root: {
    minHeight: '20vh',
    padding: '16px',
    height: '100%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  cardContent: {
    height: '100%'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  deckCodeSubheader: {
    'word-break': 'break-all',
    width: '100%'
  }
})

export function DeckCode ({ deckCode, setDeckCode }) {
  const classes = useStyles()
  const [isDialogOpen, setDialogOpen] = useState(false)

  const writeDeckCodeToClipboard = () => {
    trackDeckCodeCopy(deckCode)
    navigator.clipboard.writeText(deckCode)
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        title='Deck Code'
        action={
          <>
            <Tooltip title='Copy Deck Code' aria-label='copy deck code'>
              <IconButton onClick={writeDeckCodeToClipboard}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Paste Deck Code' aria-label='paste deck code'>
              <IconButton onClick={() => setDialogOpen(true)}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Clear Deck Code' aria-label='clear deck code'>
              <IconButton onClick={() => setDeckCode('SPAAAAAA')}>
                <ClearIcon />
              </IconButton>
            </Tooltip>
          </>
        }
      />
      <CardContent>
        <Typography className={classes.deckCodeSubheader}>
          {deckCode}
        </Typography>
        <PasteDeckCodeDialog
          setDeckCode={setDeckCode}
          closeDialog={() => setDialogOpen(false)}
          isDialogOpen={isDialogOpen}
        />
      </CardContent>
    </Card>
  )
}

function PasteDeckCodeDialog ({ setDeckCode, closeDialog, isDialogOpen }) {
  const [deckCode, updateDeckCode] = useState('')
  return (
    <Dialog
      open={isDialogOpen}
      onClose={closeDialog}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Paste Deck Code</DialogTitle>
      <DialogContent>
        <DialogContentText>Paste a deck code =)</DialogContentText>
        <TextareaAutosize
          aria-label='Deck Code'
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
            trackDeckCodePaste(deckCode)
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
