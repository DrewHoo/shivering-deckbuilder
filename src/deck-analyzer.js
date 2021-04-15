import _ from 'lodash'
import { cards as collection } from './collection'

export function getCardsFromDeckCode (deckCode) {
  let count = 1
  return _.chunk(deckCode.slice(2), 2)
    .map(arr => arr.join(''))
    .flatMap(cardCode => {
      const card = collection.find(({ code }) => code === cardCode)
      if (card) {
        return _.range(1, count).map(() => card)
      } else {
        count += 1
        return []
      }
    })
    .filter(card => !!card)
}

export function addCardToDeck (deckCode, card) {
  const deck = turnDeckCodeToObject(deckCode)
  addCardToDeckObject(deck, card)
  return turnObjectToDeckCode(deck)
}

/**
 * creates a deck object that looks like this:
 * {
 *  1: ['ab', 'ac'],
 *  2: ['de', 'fg']
 * }
 */
export function turnDeckCodeToObject (deckCode) {
  let count = 0
  return _.chunk(deckCode.slice(2), 2)
    .map(arr => arr.join(''))
    .map(code => {
      const card = collection.find(card => card.code === code)
      if (card) {
        return [count, card.code]
      } else {
        count += 1
        return [count]
      }
    })
    .reduce(
      (acc, [count, code]) => ({
        ...acc,
        [count]: code ? [...(acc[count] || []), code] : []
      }),
      {}
    )
}

export function turnObjectToDeckCode (deck) {
  return Object.values(deck)
    .map(cards => `${turnNumberIntoBase26(cards.length)}${cards.join('')}`)
    .reduce((acc, next) => `${acc}${next}`, 'SP')
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

function turnNumberIntoBase26 (number) {
  let i = 0
  while (number > 26) {
    number %= 26
    i++
  }
  return String.fromCharCode(65 + i) + String.fromCharCode(65 + number)
}
