export function turnNumberIntoBase26 (number) {
  let i = 0
  while (number > 26) {
    number %= 26
    i++
  }
  return String.fromCharCode(65 + i) + String.fromCharCode(65 + number)
}