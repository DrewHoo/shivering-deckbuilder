import _ from 'lodash'
import { cards as collection } from './collection'

export function getCardsFromDeckCode (deckCode) {
  let index = 0
  const cards = []
  let count = 0
  while (index < deckCode.length) {
    const cardCode = deckCode.slice(index, index + 2)
    const card = collection.find(({ code }) => code === cardCode)
    if (card) {
      _.range(1, count).forEach(() => {
        cards.push(card)
      })
    } else {
      count += 1
    }
    index += 2
  }
  return cards
}
