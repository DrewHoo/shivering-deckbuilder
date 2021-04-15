import FileCopyIcon from '@material-ui/icons/FileCopy'
import React from 'react'
import { trackDeckCodePaste } from './tracker'

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
    <label>
      <textarea value={deckCode} onChange={handleChange}></textarea>
      <FileCopyIcon onClick={writeDeckCodeToClipboard} />
    </label>
  )
}
