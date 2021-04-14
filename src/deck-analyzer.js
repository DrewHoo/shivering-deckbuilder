import { cards as collection } from './collection'

export function getCardsFromDeckCode (deckCode) {
  let index = 2
  const cards = []
  while (index < deckCode.length) {
    const cardCode = deckCode.slice(index, index + 2)
    const card = collection.find(({ code }) => code === cardCode)
    cards.push(card || cardCode)
    index += 2
  }
  return cards
}
