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


// helper function: for three digits
// MUST BE called with one number agument between [0..999]
const threeDigits = function (num) {
  text = ""
  let hundred = ((num % 1000) - (num % 100)) / 100    //the hundred-digit
  if (hundred > 0) text = NUM_NAMES[hundred] + " hundred"


  return text
}


const convToText = function (num) {
  // here we will check for bad parameter:
  // is it a number? too big? infinity, -infinity, NaN?
  // negative?

  return threeDigits(num % 1000)
}



// export only if on server side
if (typeof module === 'object') {
  module.exports = convToText
}
