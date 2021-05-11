import _ from 'lodash'
import { cards as collection } from '../collection'
import { turnBase26IntoNumber, turnNumberIntoBase26 } from './card-code-math'

export function getCardsFromDeckCode (deckCode) {
  let index = 0
  let count = 0
  return _.chunk(deckCode.slice(2), 2)
    .map(arr => arr.join(''))
    .flatMap(cardCode => {
      if (index === 0) {
        index = turnBase26IntoNumber(cardCode)
        count += 1
        return []
      } else {
        const card = collection.find(({ code }) => code === cardCode)
        index -= 1
        return _.range(1, count + 1).map(() => card)
      }
    })
    .filter(card => !!card)
}

export function deckCodeToCardList (deckCode) {
  let index = 0
  let count = 0
  return _.chunk(deckCode.slice(2), 2)
    .map(arr => arr.join(''))
    .map(code => {
      if (index === 0) {
        index = turnBase26IntoNumber(code)
        count += 1
        return undefined
      } else {
        const card = collection.find(card => card.code === code)
        index -= 1
        return { ...card, count }
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
  let index = 0
  return _.chunk(deckCode.slice(2), 2)
    .map(arr => arr.join(''))
    .map(code => {
      if (index === 0) {
        index = turnBase26IntoNumber(code)
        count += 1
        return [count]
      } else {
        index -= 1
        const card = collection.find(card => card.code === code)
        if (!card) {
          debugger;
          console.log(code)
        }
        return [count, card.code]
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
