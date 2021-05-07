import _ from 'lodash'
import { turnDeckCodeToObject, turnObjectToDeckCode } from './deck-code-mapping'

export function addCardToDeck (deckCode, card) {
  const deck = turnDeckCodeToObject(deckCode)
  addCardToDeckObject(deck, card)
  return turnObjectToDeckCode(deck)
}

export function removeCardFromDeck (deckCode, card) {
  const deck = turnDeckCodeToObject(deckCode)
  removeCardFromDeckObject(deck, card)
  return turnObjectToDeckCode(deck)
}

export function addCardToDeckObject (deck, card) {
  const pair = Object.entries(deck).find(([, cards]) =>
    cards.find(c => c === card.code)
  )

  let newCount = 1
  if (pair) {
    const [_count, cards] = pair
    const count = parseInt(_count, 10)
    newCount = count + 1
    deck[count] = _.without(cards, card.code)
  }

  if (!deck[newCount]) {
    deck[newCount] = [card.code]
  } else {
    deck[newCount].push(card.code)
  }
}

export function removeCardFromDeckObject (deck, card) {
  const pair = Object.entries(deck).find(([, cards]) =>
    cards.find(c => c === card.code)
  )

  if (!pair) {
    console.error(`No card '${card.Name}' found in deck`)
    return
  }

  const [_count, cards] = pair
  const count = parseInt(_count, 10)
  const newCount = count - 1
  deck[count] = _.without(cards, card.code)

  if (newCount === 0) {
    return
  }

  if (!deck[newCount]) {
    deck[newCount] = [card.code]
  } else {
    deck[newCount].push(card.code)
  }
}
