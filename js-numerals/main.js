// Main entrypoint

const convToText = require('./convToText')

console.log(3, convToText(3))
console.log(32, convToText(32))
console.log(321, convToText(321))
console.log(1021, convToText(1021))
console.log(501, convToText(501))
console.log(921, convToText(921))
console.log(4321, convToText(4321))

console.log(Infinity, convToText(Infinity))
console.log(-921, convToText(-921))
