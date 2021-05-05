import React from 'react'
import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'
import { CardImage } from './CardImage'

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    boxShadow: 'none',
    backgroundColor: 'unset'
  }
}))

export function CardPopover ({
  card,
  handlePopoverClose,
  anchorEl,
  popoverId
}) {
  const classes = useStyles()

  const open = Boolean(anchorEl)

  return (
    <Popover
      id={popoverId}
      className={classes.popover}
      open={open}
      anchorEl={anchorEl}
      classes={{ paper: classes.paper }}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left'
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
      disableScrollLock
    >
      <CardImage card={card} />
    </Popover>
  )
}
