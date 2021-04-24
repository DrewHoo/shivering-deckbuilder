import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

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

export function DeckListCard ({ card, handleClickOpen }) {
  const classes = useStyles()

  return (
    <ListItem alignItems='flex-start' onClick={() => handleClickOpen(card)}>
      <ListItemText>
        <Typography>{card.count}</Typography>
      </ListItemText>
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
            {`${card.Type}, ${card['Magicka Cost']}-cost`}
          </Typography>
        }
      />
    </ListItem>
  )
}
