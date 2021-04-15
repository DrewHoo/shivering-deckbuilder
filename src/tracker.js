import mixpanel from 'mixpanel-browser'

const MixpanelEventNames = {
  DeckCodePasted: 'Deck Code Pasted',
  CardAdded: 'Card Added',
  DeckCodeCopied: 'Deck Code Copied'
}

export function trackDeckCodePaste (deckCode) {
  mixpanel.track(MixpanelEventNames.DeckCodePasted, { deckCode })
}

export function trackCardAdded (cardName) {
  mixpanel.track(MixpanelEventNames.CardAdded, { card: cardName })
}

export function trackDeckCodeCopy (deckCode) {
  mixpanel.track(MixpanelEventNames.DeckCodeCopied, { deckCode })
}
