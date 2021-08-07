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
import Switch from '@material-ui/core/Switch'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import MenuIcon from '@material-ui/icons/Menu'
import { CollectionView } from '../CollectionView/CollectionView'
import DeckDetail from '../DeckDetail'
import { CardPicker } from '../CardPicker/CardPicker'

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

export function DataViz () {
  const [queryParams, setQueryParams] = useQueryParams()

  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={clsx(classes.toolBar)}>
          <Typography variant='h6' noWrap>
            The Shivering Deck Builder
          </Typography>
        </Toolbar>
      </AppBar>
      {/* {collectionView && (
        <main className={clsx(classes.collectionViewContent)}>
          <div className={classes.drawerHeader} />
          <CollectionView />
        </main>
      )} */}
    </div>
  )
}
