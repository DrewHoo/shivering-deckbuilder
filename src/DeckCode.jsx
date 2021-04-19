import React from 'react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import { trackDeckCodeCopy, trackDeckCodePaste } from './tracker'

export function DeckCode ({ deckCode, setDeckCode }) {
  const handleChange = changeEvent => {
    if (changeEvent?.target?.value) {
      trackDeckCodePaste(changeEvent.target.value)
      setDeckCode(changeEvent.target.value)
    }
  }
  const writeDeckCodeToClipboard = () => {
    // this is a promise that we'll need to await and catch etc
    trackDeckCodeCopy(deckCode)
    navigator.clipboard.writeText(deckCode)
  }
  return (
    <div>
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
