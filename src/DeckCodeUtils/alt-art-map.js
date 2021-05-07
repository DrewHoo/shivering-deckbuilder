import _ from 'lodash'

export const altArtCodeMap = {
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
