import React, { useCallback, useEffect, useState } from 'react'
import { useQueryParams } from 'hookrouter'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { useTheme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import IconButton from '@material-ui/core/IconButton'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import MenuIcon from '@material-ui/icons/Menu'
import { CollectionView } from './CollectionView/CollectionView'
import DeckDetail from './DeckDetail'
import { addCardToDeck, removeCardFromDeck } from './DeckCodeUtils/mutate-deck'
import { CardPicker } from './CardPicker/CardPicker'

const drawerWidth = 320

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolBar: {
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  collectionViewContent: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))

export default function DeckBuilder () {
  const [queryParams, setQueryParams] = useQueryParams()
  const setDeckCode = useCallback(
    dc => {
      setQueryParams({ ...queryParams, deckCode: dc })
    },
    [setQueryParams, queryParams]
  )
  useEffect(() => {
    if (!queryParams.deckCode) {
      setDeckCode('SPAAAAAA')
    }
  }, [queryParams.deckCode, setDeckCode])

  const addCard = card => {
    setDeckCode(addCardToDeck(queryParams.deckCode, card))
  }
  const removeCard = card => {
    setDeckCode(removeCardFromDeck(queryParams.deckCode, card))
  }

  const [collectionView, setCollectionView] = useState(true)
  const updateCollectionView = useCallback(
    () => setCollectionView(!collectionView),
    [collectionView, setCollectionView]
  )

  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar className={clsx(classes.toolBar)}>
          {!collectionView && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <LibraryBooksIcon />
            </IconButton>
          )}
          <Typography variant='h6' noWrap>
            The Shivering Deck Builder
          </Typography>
          <FormControlLabel
            label='Collection Analysis Mode'
            control={
              <Switch
                checked={collectionView}
                onChange={updateCollectionView}
                name='collectionView'
                color='secondary'
              />
            }
          />
        </Toolbar>
      </AppBar>
      {!collectionView && (
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <CardPicker addCard={addCard} />
        </Drawer>
      )}
      {!collectionView && (
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          {queryParams.deckCode && (
            <DeckDetail
              setDeckCode={setDeckCode}
              deckCode={queryParams.deckCode}
              addCard={addCard}
              removeCard={removeCard}
            />
          )}
        </main>
      )}
      {collectionView && (
        <main className={clsx(classes.collectionViewContent)}>
          <div className={classes.drawerHeader} />
          <CollectionView />
        </main>
      )}
    </div>
  )
}
