export function calculateOddsOfDrawingKCard (deckSize, copies, cardsDrawn) {
  const i = 1
  let probabilityOfAtLeast1
  if (i > 0)
    probabilityOfAtLeast1 = 1 - hyp(i - 1, cardsDrawn, copies, deckSize)
  else probabilityOfAtLeast1 = 1
  if (probabilityOfAtLeast1 < 1e-6) probabilityOfAtLeast1 = 0
  return (100 * probabilityOfAtLeast1).toPrecision(3) + '%'

  // $('.pram').each(function (i, obj) {
  //   pram = hyp(i, drawn, copies, deck)
  //   if (pram < 1e-6) pram = 0
  //   $(obj).html((100 * pram).toPrecision(3) + '%')
  // })
}

function hyp (x, n, m, nn) {
  //x = x-value
  //n = sample size
  //m = subpopulation size
  //nn = population size
  var nz, mz
  // best to have n<m
  if (m < n) {
    nz = m
    mz = n
  } else {
    nz = n
    mz = m
  }
  var h = 1
  var s = 1
  var k = 0
  var i = 0
  while (i < x) {
    while (s > 1 && k < nz) {
      h = h * (1 - mz / (nn - k))
      s = s * (1 - mz / (nn - k))
      k = k + 1
    }
    h = (h * (nz - i) * (mz - i)) / (i + 1) / (nn - nz - mz + i + 1)
    s = s + h
    i = i + 1
  }
  while (k < nz) {
    s = s * (1 - mz / (nn - k))
    k = k + 1
  }
  return s
}
