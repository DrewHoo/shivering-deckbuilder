const fs = require('fs')
const { cards } = require('./src/collection')
const _ = require('lodash')
const { detectMechanics } = require('./mechanic-detection')

function cleanup () {
  const newCards = cards.map((card) => ({
    ...card,
    Mechanics: detectMechanics(card)
  }))

  fs.writeFileSync(
    './collection.js',
    `const cards = ${JSON.stringify(
      newCards,
      null,
      '\t'
    )}\nmodule.exports = {cards}`
  )
}

cleanup()
