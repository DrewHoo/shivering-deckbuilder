import _ from 'lodash'
import { cards as collection } from '../collection'
import { AttributeNames } from '../constants'
import { deckCodeToCardList, turnDeckCodeToObject } from './deck-code-mapping'

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
