import mixpanel from 'mixpanel-browser'

const MixpanelEventNames = {
  PageLoaded: 'Page Loaded',
  DeckCodePasted: 'Deck Code Pasted',
  CollectionCodePasted: 'Collection Code Pasted',
  CardAdded: 'Card Added',
  DeckCodeCopied: 'Deck Code Copied',
  DeckBuilderFilterAdded: 'Deck Builder Filter Added',
  DeckBuilderFilterRemoved: 'Deck Builder Filter Removed'
}

const MixpanelPropertyNames = {
  DeckBuilderFilter: 'Deck Builder Filter',
  ActionMethod: 'Action Method'
}

export function trackPageLoaded () {
  mixpanel.track(MixpanelEventNames.PageLoaded)
}

export function trackDeckCodePaste (deckCode) {
  mixpanel.track(MixpanelEventNames.DeckCodePasted, { deckCode })
}

export function trackCollectionCodePaste (collectionCode) {
  mixpanel.track(MixpanelEventNames.CollectionCodePasted, { collectionCode })
}

export function trackCardAdded (
  cardName,
  actionMethod = 'Deck Builder Slideout'
) {
  mixpanel.track(MixpanelEventNames.CardAdded, {
    card: cardName,
    [MixpanelPropertyNames.ActionMethod]: actionMethod
  })
}

export function trackCardRemoved (cardName, actionMethod = 'Deck List View') {
  mixpanel.track(MixpanelEventNames.CardRemoved, {
    card: cardName,
    [MixpanelPropertyNames.ActionMethod]: actionMethod
  })
}

export function trackDeckCodeCopy (deckCode) {
  mixpanel.track(MixpanelEventNames.DeckCodeCopied, { deckCode })
}

export function trackFilterAdded (filter) {
  mixpanel.track(MixpanelEventNames.DeckBuilderFilterAdded, {
    [MixpanelPropertyNames.DeckBuilderFilter]: filter
  })
}

export function trackFilterRemoved (filter) {
  mixpanel.track(MixpanelEventNames.DeckBuilderFilterRemoved, {
    [MixpanelPropertyNames.DeckBuilderFilter]: filter
  })
}
