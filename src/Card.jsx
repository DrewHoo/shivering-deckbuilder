import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CardHeader } from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: '20vh',
    padding: '16px'
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
  }
})

export default function SimpleCard ({ children, title, action }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardHeader title={title} action={action} />
      <CardContent className={classes.cardContent}>{children}</CardContent>
    </Card>
  )
}
