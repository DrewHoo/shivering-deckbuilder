import React from 'react'
import Grid from '@material-ui/core/Grid'

import { makeStyles } from '@material-ui/core'
import { CustomizableGraph } from './CustomizableGraph'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export const CollectionView = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction='row' justify='center'>
        <Grid item xs={6} sm={12}>
          <CustomizableGraph />
        </Grid>
      </Grid>
    </div>
  )
}
