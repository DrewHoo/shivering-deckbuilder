import _ from 'lodash'
import { cards as collection } from './collection'
import { AttributeNames } from './constants'

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

const altArtCodeMap = {
  ap: 'ao',
  aY: 'aX',
  zp: 'Sa',
  zH: 'bH',
  zE: 'bK',
  zq: 'qn',
  bV: 'BU',
  sq: 'cx',
  zm: 'cy',
  Ag: 'dI',
  zr: 'dL',
  dN: 'dM',
  zS: 'dP',
  sr: 'ee',
  zR: 'ef',
  yZ: 'eD',
  Ak: 'eF',
  Af: 'eG',
  zg: 'fW',
  zL: 'fL',
  zU: 'fA',
  zI: 'fx',
  zT: 'gy',
  zz: 'hb',
  hp: 'ho',
  zY: 'hv',
  Aa: 'hw',
  hG: 'hF',
  zX: 'hL',
  zj: 'hU',
  in: 'im',
  Ac: 'iF',
  zW: 'iK',
  ju: 'jt',
  jz: 'jy',
  zK: 'jE',
  jI: 'jH',
  km: 'kl',
  kO: 'kN',
  zw: 'kX',
  Ab: 'wJ',
  zn: 'lf',
  zo: 'lh',
  su: 'lD',
  zG: 'lI',
  mb: 'lY',
  st: 'mC',
  ze: 'mG',
  zF: 'nr',
  zs: 'rk',
  zM: 'qR',
  zb: 'qN',
  zi: 'qy',
  An: 'pZ',
  pY: 'pX',
  pA: 'pz',
  zt: 'pe',
  zy: 'um',
  ss: 'oe',
  nW: 'nV',
  za: 'nN',
  zv: 'nw'
}

export function mapAltArts (deckCode) {
  return `SP${_.chunk(deckCode.slice(2), 2)
    .map(arr => arr.join(''))
    .map(cardCode => {
      if (altArtCodeMap[cardCode]) {
        return altArtCodeMap[cardCode]
      }
      return cardCode
    })
    .join('')}`
}

export function isDeckCodeValid (
  deckCode,
  {
    maxNumCopies,
    minDeckSize,
    minTriColorDeckSize,
    allowedSets,
    allowedRarities
  }
) {
  const errors = []
  const deck = turnDeckCodeToObject(deckCode)
  const cardList = deckCodeToCardList(deckCode)
  if (!hasNoMoreThanMaxCopies(deck, maxNumCopies)) {
    errors.push('maxCopies')
  }

  if (!hasNoDuplicateUniques(deck)) {
    errors.push('duplicateUniques')
  }

  if (!doesNotExceedMaxDeckSize(cardList)) {
    errors.push('maxDeckSize')
  }

  if (!onlyContainsCardsFromAllowedSets(cardList, allowedSets)) {
    errors.push('allowedSets')
  }

  if (!onlyContainsCardsFromAllowedRarities(cardList, allowedRarities)) {
    errors.push('allowedRarities')
  }

  if (!isAboveMinDeckThreshold(cardList, minDeckSize, minTriColorDeckSize)) {
    errors.push('minDeckSize')
  }

  if (!hasMaxThreeColors(cardList)) {
    errors.push('maxThreeColors')
  }

  if (!includesTriColorCardIfThreeColors(cardList)) {
    errors.push('tricolorCard')
  }

  return errors
}

function onlyContainsCardsFromAllowedSets (cardList, allowedSets) {
  return cardList.every(card => allowedSets.includes(card['Expansion set']))
}

function onlyContainsCardsFromAllowedRarities (cardList, allowedRarities) {
  return cardList.every(card => allowedRarities.includes(card['Rarity']))
}

function getUniqueAttributes (cardList) {
  return _.uniq(
    cardList
      .flatMap(({ Attributes }) => Attributes)
      .filter(attribute => attribute !== AttributeNames.Neutral.toLowerCase())
  )
}

function isAboveMinDeckThreshold (cardList, minDeckSize, minTriColorDeckSize) {
  const numCards = cardList.reduce((sum, { count }) => count + sum, 0)
  return getUniqueAttributes(cardList).length < 3
    ? numCards >= minDeckSize
    : numCards >= minTriColorDeckSize
}

function hasMaxThreeColors (cardList) {
  return getUniqueAttributes(cardList).length <= 3
}

function includesTriColorCardIfThreeColors (cardList) {
  if (getUniqueAttributes(cardList).length === 3) {
    return cardList.filter(({ Attributes }) => Attributes.length === 3).length
  }
  return true
}

function hasNoDuplicateUniques (deck) {
  return Object.entries(deck)
    .filter(([count]) => count > 1)
    .every(([, cardCodes]) =>
      cardCodes.every(
        cardCode =>
          collection.find(({ code }) => cardCode === code).Rarity !==
          'Legendary - Unique'
      )
    )
}

function doesNotExceedMaxDeckSize (cardList) {
  const numCards = cardList.reduce((sum, { count }) => count + sum, 0)
  return numCards <= 100
}

function hasNoMoreThanMaxCopies (deck, maxCopies) {
  if (
    Math.max(
      ...Object.entries(deck)
        .filter(([, cards]) => cards.length)
        .map(count => parseInt(count, 10)),
      maxCopies
    ) <= maxCopies
  ) {
    return true
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

function turnNumberIntoBase26 (number) {
  let i = 0
  while (number > 26) {
    number %= 26
    i++
  }
  return String.fromCharCode(65 + i) + String.fromCharCode(65 + number)
}
