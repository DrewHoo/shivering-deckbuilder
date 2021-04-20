import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { IconButton, ListItemSecondaryAction } from '@material-ui/core'
import { trackCardAdded, trackCardRemoved } from '../tracker'

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline'
  },
  block: {
    display: 'block'
  },
  SecondaryAction: {
    display: 'block'
  }
}))

export function DeckListCard ({ card, addCard, removeCard }) {
  const classes = useStyles()

  return (
    <ListItem alignItems='flex-start'>
      <ListItemText
        primary={
          <Typography
            component='div'
            variant='body2'
            className={classes.block}
            color='textPrimary'
          >
            {card.Name}
          </Typography>
        }
        secondary={
          <Typography
            component='span'
            variant='caption'
            className={classes.inline}
            color='textPrimary'
          >
            {card.Type}
          </Typography>
        }
      />
      <ListItemSecondaryAction className={classes.SecondaryAction}>
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
      </ListItemSecondaryAction>
    </ListItem>
  )
}
