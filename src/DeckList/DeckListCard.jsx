import React from 'react'
import _ from 'lodash'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { Avatar, ListItemAvatar } from '@material-ui/core'
import { AttributeToColorMap } from '../AttributePieGraph'
import { CardPopover } from './CardPopover'
import { useImage } from './CardImage'

const useStyles = makeStyles(theme => ({
  listItemText: {
    // padding: '.5vh 0'
  },
  listItemAvatar: { minWidth: '40px' },
  countIndicatorAvatar: { minWidth: 'unset' },
  listItem: {
    margin: '.5rem',
    cursor: 'pointer',
    borderRadius: '0.25rem',
    backgroundPosition: '50% 30%',
    backgroundSize: '135%',
    backgroundRepeat: 'no-repeat',
    backgroundClip: 'border-box'
  },
  inline: {
    display: 'inline',
    alignSelf: 'center'
  },
  block: {
    display: 'block'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  rightPadding: {
    paddingRight: '1vw'
  },
  SecondaryAction: {
    display: 'block'
  },
  blue: {
    color: '#fff',
    backgroundColor: blue[500]
  },
  grey: {
    color: '#000',
    backgroundColor: '#cdcdcd'
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    fontSize: '1rem'
  },
  text: { color: 'white' },
  cardTitle: { textShadow: '4px 4px 5px black', fontWeight: '600' },

  strength: { backgroundColor: AttributeToColorMap.strength },
  willpower: { backgroundColor: AttributeToColorMap.willpower },
  intelligence: { backgroundColor: AttributeToColorMap.intelligence },
  agility: { backgroundColor: AttributeToColorMap.agility },
  endurance: { backgroundColor: AttributeToColorMap.endurance },
  neutral: { backgroundColor: AttributeToColorMap.neutral },

  battlemage: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.intelligence
    )
  },
  mage: {
    background: makeGradient(
      AttributeToColorMap.intelligence,
      AttributeToColorMap.willpower
    )
  },
  monk: {
    background: makeGradient(
      AttributeToColorMap.agility,
      AttributeToColorMap.willpower
    )
  },
  scout: {
    background: makeGradient(
      AttributeToColorMap.agility,
      AttributeToColorMap.endurance
    )
  },
  crusader: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.willpower
    )
  },
  archer: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.agility
    )
  },
  warrior: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.endurance
    )
  },
  assassin: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.intelligence
    )
  },
  sorcerer: {
    background: makeGradient(
      AttributeToColorMap.intelligence,
      AttributeToColorMap.endurance
    )
  },
  spellsword: {
    background: makeGradient(
      AttributeToColorMap.willpower,
      AttributeToColorMap.endurance
    )
  },

  guildsworn: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.intelligence,
      AttributeToColorMap.willpower
    )
  },
  dagoth: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.intelligence,
      AttributeToColorMap.agility
    )
  },
  covenant: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.intelligence,
      AttributeToColorMap.endurance
    )
  },
  hlaalu: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.willpower,
      AttributeToColorMap.agility
    )
  },
  redoran: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.willpower,
      AttributeToColorMap.endurance
    )
  },
  ebonheart: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.agility,
      AttributeToColorMap.endurance
    )
  },
  dominion: {
    background: makeGradient(
      AttributeToColorMap.intelligence,
      AttributeToColorMap.willpower,
      AttributeToColorMap.agility
    )
  },
  telvanni: {
    background: makeGradient(
      AttributeToColorMap.strength,
      AttributeToColorMap.intelligence
    )
  },
  tribunal: {
    background: makeGradient(
      AttributeToColorMap.intelligence,
      AttributeToColorMap.willpower,
      AttributeToColorMap.endurance
    )
  },
  empire: {
    background: makeGradient(
      AttributeToColorMap.willpower,
      AttributeToColorMap.agility,
      AttributeToColorMap.endurance
    )
  }
}))

export function DeckListCard ({ card, handleClickOpen }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const ref = React.useRef(null)

  const handlePopoverOpen = () => {
    setAnchorEl(ref.current)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const popoverId = `decklist${_.snakeCase(card.Name)}`
  const imageSrc = useImage(card)

  return (
    <ListItem
      ref={ref}
      aria-owns={open ? popoverId : undefined}
      aria-haspopup='true'
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      style={{
        ...(imageSrc && {
          backgroundImage: `${makeImageGradient(
            mapAttributesToClass(card.Attributes)
          )}, url(${imageSrc})`
        })
      }}
      className={clsx(classes.listItem)}
      alignItems='center'
      onClick={() => handleClickOpen(card)}
    >
      <ListItemAvatar className={classes.listItemAvatar}>
        <Avatar className={clsx(classes.blue, classes.small)}>
          {card['Magicka Cost']}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={clsx(classes.text, classes.listItemText)}
        primary={
          <div className={classes.flex}>
            <Typography
              component='div'
              variant='body1'
              className={clsx(classes.inline, classes.cardTitle)}
            >
              {card.Name}
            </Typography>
            <ListItemAvatar className={classes.countIndicatorAvatar}>
              <Avatar className={clsx(classes.grey, classes.small)}>
                {card.count}
              </Avatar>
            </ListItemAvatar>
          </div>
        }
      />
      <CardPopover
        card={card}
        handlePopoverClose={handlePopoverClose}
        anchorEl={anchorEl}
        popoverId={popoverId}
      />
    </ListItem>
  )
}

function makeImageGradient (house) {
  switch (house) {
    case 'strength':
      return makeGradient(AttributeToColorMap.strength)
    case 'willpower':
      return makeGradient(AttributeToColorMap.willpower)
    case 'intelligence':
      return makeGradient(AttributeToColorMap.intelligence)
    case 'agility':
      return makeGradient(AttributeToColorMap.agility)
    case 'endurance':
      return makeGradient(AttributeToColorMap.endurance)
    case 'neutral':
      return makeGradient(AttributeToColorMap.neutral)

    case 'battlemage':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.intelligence
      )

    case 'mage':
      return makeGradient(
        AttributeToColorMap.intelligence,
        AttributeToColorMap.willpower
      )

    case 'monk':
      return makeGradient(
        AttributeToColorMap.willpower,
        AttributeToColorMap.agility
      )

    case 'scout':
      return makeGradient(
        AttributeToColorMap.agility,
        AttributeToColorMap.endurance
      )

    case 'crusader':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.willpower
      )

    case 'archer':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.agility
      )

    case 'warrior':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.endurance
      )

    case 'assassin':
      return makeGradient(
        AttributeToColorMap.intelligence,
        AttributeToColorMap.agility
      )

    case 'sorcerer':
      return makeGradient(
        AttributeToColorMap.intelligence,
        AttributeToColorMap.endurance
      )

    case 'spellsword':
      return makeGradient(
        AttributeToColorMap.willpower,
        AttributeToColorMap.endurance
      )

    case 'guildsworn':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.intelligence,
        AttributeToColorMap.willpower
      )

    case 'dagoth':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.intelligence,
        AttributeToColorMap.agility
      )

    case 'covenant':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.intelligence,
        AttributeToColorMap.endurance
      )

    case 'hlaalu':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.willpower,
        AttributeToColorMap.agility
      )

    case 'redoran':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.willpower,
        AttributeToColorMap.endurance
      )

    case 'ebonheart':
      return makeGradient(
        AttributeToColorMap.strength,
        AttributeToColorMap.agility,
        AttributeToColorMap.endurance
      )

    case 'dominion':
      return makeGradient(
        AttributeToColorMap.intelligence,
        AttributeToColorMap.willpower,
        AttributeToColorMap.agility
      )

    case 'telvanni':
      return makeGradient(
        AttributeToColorMap.intelligence,
        AttributeToColorMap.agility,
        AttributeToColorMap.endurance
      )

    case 'tribunal':
      return makeGradient(
        AttributeToColorMap.intelligence,
        AttributeToColorMap.willpower,
        AttributeToColorMap.endurance
      )

    case 'empire':
      return makeGradient(
        AttributeToColorMap.willpower,
        AttributeToColorMap.agility,
        AttributeToColorMap.endurance
      )
    default:
      return makeGradient(AttributeToColorMap.neutral)
  }
}

function mapAttributesToClass (attributes) {
  const key = attributes.sort().join(',')
  switch (key) {
    case 'strength':
    case 'willpower':
    case 'intelligence':
    case 'agility':
    case 'endurance':
    case 'neutral':
      return key
    case 'intelligence,strength':
      return 'battlemage'
    case 'strength,willpower':
      return 'crusader'
    case 'agility,strength':
      return 'archer'
    case 'endurance,strength':
      return 'warrior'
    case 'intelligence,willpower':
      return 'mage'
    case 'agility,intelligence':
      return 'assassin'
    case 'endurance,intelligence':
      return 'sorcerer'
    case 'agility,willpower':
      return 'monk'
    case 'endurance,willpower':
      return 'spellsword'
    case 'agility,endurance':
      return 'scout'
    case 'agility,endurance,intelligence':
      return 'telvanni'
    case 'agility,endurance,strength':
      return 'ebonheart'
    case 'agility,endurance,willpower':
      return 'empire'
    case 'agility,intelligence,strength':
      return 'dagoth'
    case 'agility,intelligence,willpower':
      return 'dominion'
    case 'agility,strength,willpower':
      return 'hlaalu'
    case 'endurance,intelligence,strength':
      return 'covenant'
    case 'endurance,intelligence,willpower':
      return 'tribunal'
    case 'endurance,strength,willpower':
      return 'redoran'
    case 'intelligence,strength,willpower':
      return 'guildsworn'
    default:
      return 'neutral'
  }
}

function makeGradient (color1, color2, color3) {
  if (color3) {
    return `linear-gradient(to right, ${color1}, ${color1} 15%, ${color2} 30%, ${color3} 45%, transparent 50%)`
  }
  if (color2) {
    return `linear-gradient(to right, ${color1}, ${color1} 20%, ${color2}, ${color2} 30%, transparent 40%)`
  }
  return `linear-gradient(to right, ${color1}, ${color1} 20%, transparent 40%)`
}
