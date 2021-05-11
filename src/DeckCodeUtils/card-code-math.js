// this only works for 2-digit base 26 numbers that start at A
// which is what deckcodes and collection codes are made of
export function turnNumberIntoBase26 (number) {
  let i = 0
  while (number > 26) {
    number %= 26
    i++
  }
  return String.fromCharCode(65 + i) + String.fromCharCode(65 + number)
}

export function turnBase26IntoNumber (base26Number) {
  return (
    26 * (base26Number.charCodeAt(0) - 65) + (base26Number.charCodeAt(1) - 65)
  )
}
