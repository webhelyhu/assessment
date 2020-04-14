

const convToText = require('./convToText')


test('dummy testing', () => {
  expect(convToText(33)).toBe('thirty-three')
})
test('dummy testing', () => {
  expect(convToText(7)).toBe('seven')
})
test('dummy testing', () => {
  expect(convToText(42)).toBe('forty-two')
})
test('dummy testing', () => {
  expect(convToText(2001)).toBe('two thousand and one')
})
test('dummy testing', () => {
  expect(convToText(1999)).toBe('nineteen hundred and ninety-nine')
})
test('dummy testing', () => {
  expect(convToText(17999)).toBe('seventeen thousand nine hundred and ninety-nine')
})
