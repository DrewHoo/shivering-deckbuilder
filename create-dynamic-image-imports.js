const fs = require('fs')
const { cards } = require('./src/collection')

;(async function () {
  const file = cards
    .map(({ Name }) => ({
      Name,
      name: String(Name).replaceAll(/[\W]+/g, ''),
      urlName: Name.toLowerCase().replaceAll(/[\W]+/g, '-')
    }))
    .reduce((acc, { name, urlName, Name }) => {
      return `${acc}\n\t\tcase "${Name}":\n\t\t\treturn import('./${urlName}.png')\n`
    }, `export function getCardImage(cardName) {\n\tswitch(cardName) {`)
    .concat('\t}\n}')

  return new Promise(resolve => {
    fs.writeFile(`./src/images/getCardImage.js`, file, () => resolve())
  }).catch(err => {
    console.log(err)
    throw new Error('problem writing')
  })
})()
