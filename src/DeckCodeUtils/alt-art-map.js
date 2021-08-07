import _ from 'lodash'

/**
 * { [alt art code]: <reg art code>}
 */
export const altArtCodeMap = {
  Aa: 'hw',
  Ab: 'wJ',
  Ac: 'iF',
  Af: 'eG',
  Ag: 'dI',
  Ak: 'eF',
  Am: 'yk',
  An: 'pZ',
  ap: 'ao',
  aY: 'aX',
  bV: 'BU',
  dN: 'dM',
  hG: 'hF',
  hp: 'ho',
  in: 'im',
  jI: 'jH',
  ju: 'jt',
  jz: 'jy',
  km: 'kl',
  kO: 'kN',
  mb: 'lY',
  nW: 'nV',
  pA: 'pz',
  pY: 'pX',
  sq: 'cx',
  sr: 'ee',
  ss: 'oe',
  st: 'mC',
  su: 'lD',
  xf: 'gs',
  yZ: 'eD',
  za: 'nN',
  zb: 'qN',
  zE: 'bK',
  ze: 'mG',
  zF: 'nr',
  zg: 'fW',
  zG: 'lI',
  zH: 'bH',
  zI: 'fx',
  zi: 'qy',
  zj: 'hU',
  zK: 'jE',
  zl: 'pV',
  zL: 'fL',
  zm: 'cy',
  zM: 'qR',
  zn: 'lf',
  zo: 'lh',
  zp: 'Sa',
  zq: 'qn',
  zr: 'dL',
  zR: 'ef',
  zS: 'dP',
  zs: 'rk',
  zT: 'gy',
  zt: 'pe',
  zU: 'fA',
  zv: 'nw',
  zW: 'iK',
  zw: 'kX',
  zX: 'hL',
  zY: 'hv',
  zy: 'um',
  zz: 'hb'
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
