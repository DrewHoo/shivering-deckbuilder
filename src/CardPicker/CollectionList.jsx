import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { FixedSizeList } from 'react-window'
import { trackCardAdded } from '../tracker'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  }
}))

export function CollectionList ({ cards, addCard }) {
  const classes = useStyles()

  function renderRow (props) {
    const { index, style } = props
    const card = cards[index]

    return (
      <ListItem
        button
        style={style}
        key={card.Name}
        onClick={() => {
          trackCardAdded(card.Name)
          addCard(card)
        }}
      >
        <ListItemText primary={card.Name} secondary={card['Magicka Cost']} />
      </ListItem>
    )
  }

  return (
    <div className={classes.root}>
      <FixedSizeList
        height={400}
        width={300}
        itemSize={46}
        itemCount={cards.length}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  )
}
