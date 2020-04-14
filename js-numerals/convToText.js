const BIG_NUM_NAMES = [
  "thousand",
  "million",
  "billion",
  "trillion",
  "quadrillion",
  "quintillion",
  "sextillion"
]

const NUM_NAMES = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety"
}


const twoDigits = function (num = 0) {
  // helper function: for two digits
  // MUST BE called with one number agument between [0..99]
  // checks if there is a special name,
  // if not, creating a string with dash ("twenty-three" etc.)

  let digits = Math.floor(Math.abs(num % 100))  // I am not paranoid...

  if (NUM_NAMES.hasOwnProperty(digits)) {
    return NUM_NAMES[digits]
  } else {
    return NUM_NAMES[(digits - (digits % 10))] + '-' + NUM_NAMES[(digits % 10)]
  }
}

const threeDigits = function (num = 0) {
  // helper function, for three digit numbers.
  // uses twoDigits, and adds the hundred-part.

  const hundred = ((num - (num % 100)) % 1000) / 100   // there must be a better way...
  // console.log("hundred is: ", hundred)

  let lastTwo = twoDigits(num % 100)
  if (hundred > 0 && lastTwo.length > 0) lastTwo = " " + lastTwo   // extra space between hundred and tens

  if (hundred > 0) {
    return NUM_NAMES[hundred] + " hundred" + lastTwo
  } else {
    return lastTwo
  }
}



const convToText = function (num) {
  // here we will check for bad parameter:
  // is it a number? too big? infinity, -infinity, NaN?
  // negative?
  if (typeof num !== 'number' || num === Infinity || num === -Infinity || num !== num) return

  let text = ""

  // using Math.abs() and "negative " to handle negative numbers
  if (num < 0) text = "negative "

  return text + threeDigits(Math.abs(num))
}



// export only if on server side
if (typeof module === 'object') {
  module.exports = convToText
}
