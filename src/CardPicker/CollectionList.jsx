import React from 'react'
import _ from 'lodash'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { FixedSizeList } from 'react-window'
import Autosizer from 'react-virtualized-auto-sizer'
import { trackCardAdded } from '../tracker'
import { CardPopover } from '../DeckList/CardPopover'

export function CollectionList ({ cards, addCard }) {
  return (
    <Autosizer>
      {({ height, width }) => (
        <FixedSizeList
          overscanCount={0}
          height={height}
          width={width}
          itemSize={46}
          itemData={cards.map(card => ({ ...card, addCard }))}
          itemCount={cards.length}
        >
          {CollectionListCard}
        </FixedSizeList>
      )}
    </Autosizer>
  )
}

class CollectionListCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = { anchorEl: null }
  }

  render () {
    const { style, index, data } = this.props
    const { addCard, ...card } = data[index]
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    const popoverId = _.snakeCase(card.Name)
    return (
      <ListItem
        button
        aria-owns={open ? popoverId : undefined}
        aria-haspopup='true'
        onMouseEnter={event => {
          this.setState({ anchorEl: event.currentTarget })
        }}
        onMouseLeave={() => {
          this.setState({ anchorEl: null })
        }}
        style={style}
        key={card.Name}
        onClick={() => {
          trackCardAdded(card.Name)
          addCard(card)
        }}
      >
        <ListItemText primary={card.Name} secondary={card['Magicka Cost']} />
        <CardPopover
          popoverId={popoverId}
          card={card}
          handlePopoverClose={() => this.setState({ anchorEl: null })}
          anchorEl={anchorEl}
        />
      </ListItem>
    )
  }
}
