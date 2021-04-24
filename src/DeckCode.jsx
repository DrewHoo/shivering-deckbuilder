import React, { useState, useEffect } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import WarningIcon from '@material-ui/icons/Warning';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { trackDeckCodeCopy, trackDeckCodePaste } from './tracker'
import { isDeckCodeValid } from './deck-analyzer'

const ExpansionSets = {
  CoreSet: 'Core Set',
  ForgottenHeroCollection: 'Forgotten Hero Collection',
  FallOfTheDarkBrotherhood: 'The Fall of the Dark Brotherhood',
  ReturnToClockworkCity: 'Return to Clockwork City',
  HeroesOfSkyrim: 'Heroes of Skyrim',
  MadhouseCollection: 'Madhouse Collection',
  HousesOfMorrowind: 'Houses of Morrowind',
  IsleOfMadness: 'Isle of Madness',
  AllianceWar: 'Alliance War',
  MoonsOfElsweyr: 'Moons of Elsweyr',
  JawsOfOblivion: 'Jaws of Oblivion',
  MonthlyReward: 'Monthly Reward',
  FrostSparkCollection: 'FrostSpark Collection'
}

const Rarities = {
  Common: 'Common',
  Rare: 'Rare',
  Epic: 'Epic',
  Legendary: 'Legendary',
  LegendaryUnique: 'Legendary - Unique'
}

export function DeckCode ({ deckCode, setDeckCode }) {
  const handleChange = changeEvent => {
    if (changeEvent?.target?.value) {
      trackDeckCodePaste(changeEvent.target.value)
      setDeckCode(changeEvent.target.value)
    }
  }

  const [valid, setValid] = useState(false)
  /* eslint-disable no-unused-vars */
  const [maxNumCopies, setMaxNumCopies] = useState(3)
  const [minDeckSize, setMinDeckSize] = useState(50)
  const [minTriColorDeckSize, setMinTriColorDeckSize] = useState(75)
  const [allowedSets, setAllowedSets] = useState(Object.values(ExpansionSets))
  const [allowedRarities, setAllowedRarities] = useState(
    Object.values(Rarities)
  )

  useEffect(() => {
    const rules = {
      maxNumCopies,
      minDeckSize,
      minTriColorDeckSize,
      allowedSets,
      allowedRarities
    }
    setValid(isDeckCodeValid(deckCode, rules))
  }, [
    deckCode,
    maxNumCopies,
    minDeckSize,
    minTriColorDeckSize,
    allowedSets,
    allowedRarities
  ])

  const writeDeckCodeToClipboard = () => {
    // this is a promise that we'll need to await and catch etc
    trackDeckCodeCopy(deckCode)
    navigator.clipboard.writeText(deckCode)
  }
  return (
    <div>
      {valid && <CheckCircleIcon />}
      {!valid && <WarningIcon />}
      <TextareaAutosize
        aria-label='minimum height'
        rowsMin={3}
        placeholder='Minimum 3 rows'
        value={deckCode}
        onChange={handleChange}
      />
      <FileCopyIcon onClick={writeDeckCodeToClipboard} />
    </div>
  )
}
