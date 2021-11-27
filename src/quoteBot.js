console.log("Starting bot...")
const config = require("./config")
const Twit  = require("twit")
const { getRandomQuote } = require("./quoteService")

const MS_IN_DAY = 24*60*60*1000;
// Create new twit instance
const T = new Twit(config)

function postQuote() {
	const quote = getRandomQuote();
	if(quote) {
		T.post('statuses/update',{status: quote}, responseCallback)
        let timeNow = new Date();
        console.log(`[${timeNow.toISOString()}] Quote Posted: ${quote}`)
    }
}
function responseCallback(err) {
	if(err) console.log("error:", err)
}

function startQuoteBot(timeToStart) {
    postQuote()
    setInterval(postQuote, 1000*60*5)
}

// Post a quote daily

let targetTime = new Date();
targetTime.setHours(1)
targetTime.setMinutes(27)
targetTime.setSeconds(0)
targetTime.setMilliseconds(0)

let currentTime = new Date()

diffTime = targetTime - currentTime
if (diffTime < 0) {
    diffTime = diffTime + MS_IN_DAY
}
console.log(`[${currentTime.toISOString()}]First quote in ${diffTime/(1000*60)} minutes...`);

setTimeout(startQuoteBot, diffTime)