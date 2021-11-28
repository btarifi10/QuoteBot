const fs = require("fs")

// Read quotes
const QUOTE_FILE = "src/quotes.json"
let quotes = []
let numQuotes = 0
let active = false
let lastNvals = [-1, -1, -1, -1, -1]
let lastN = 5

function init() {
  let rawdata = fs.readFileSync(QUOTE_FILE)

  active = true;
  quotes = JSON.parse(rawdata).quotes
  numQuotes = quotes.length;
}

function getRandomNum() {
  if (!active) {
      result = init()
      if (!active) return -1
  }

  quoteId = Math.random() * numQuotes
  quoteId = Math.floor(quoteId)

  while (lastNvals.includes(quoteId)) {
    quoteId = Math.random() * numQuotes
    quoteId = Math.floor(quoteId)
  }

  lastNvals.shift()
  lastNvals.push(quoteId)
  return quoteId
}

function getRandomQuote() {
  let quoteId = getRandomNum()
  if (quoteId == -1) return null

  return quotes[quoteId]
}

module.exports = { getRandomQuote }
