import _ from 'lodash'

export function filterByCollection (list, collectionCode) {
  const userCollectionCodes = _.chunk(collectionCode.slice(2), 2).map(arr =>
    arr.join('')
  )
  return _.intersectionWith(
    list,
    userCollectionCodes,
    (card, code) => card.code === code
  )
}
