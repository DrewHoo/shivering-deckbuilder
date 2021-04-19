import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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

export default function SimpleCard ({ children, title }) {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.root}>
      <Typography className={classes.title} color='textSecondary' gutterBottom>
        {title}
      </Typography>
      <CardContent className={classes.cardContent}>{children}</CardContent>
      {/* <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions> */}
    </Card>
  )
}