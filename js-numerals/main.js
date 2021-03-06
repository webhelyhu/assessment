// Main entrypoint

const convToText = require('./convToText')

const testNumbers = [
  -5001,
  0, 1, 2, 3, undefined, 32,
  222, 1021, 501, 921, 4321, Infinity, -921,
  100004321, 10004321, 1004321, 104312,
  1223122345423,
  500, 5000, 60050044, 0504404000,
  0,
  5400,
  3005500,
  9007199254740991,
  1223122345423005542,
  100004321,
  1004321,
  500,
  1020,
  1999
]

testNumbers.forEach(element => {
  console.log(element, convToText(element))
});

