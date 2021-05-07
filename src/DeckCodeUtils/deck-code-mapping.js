import _ from 'lodash'
import { cards as collection } from '../collection'
import { turnNumberIntoBase26 } from './card-code-math'

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

export function deckCodeToCardList (deckCode) {
  let count = 0
  return _.chunk(deckCode.slice(2), 2)
    .map(arr => arr.join(''))
    .map(code => {
      const card = collection.find(card => card.code === code)
      if (card) {
        return { ...card, count }
      } else {
        count += 1
        return undefined
      }
    })
    .filter(obj => !!obj)
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
