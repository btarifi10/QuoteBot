console.log("Starting bot...")
const config = require("./config")
const TwitterApi = require('twitter-api-v2').TwitterApi;
const { getRandomQuote } = require("./quoteService")

const MS_IN_DAY = 24*60*60*1000;
// Create new twit instance
const twitterClient = new TwitterApi(
    {appKey: config.consumer_key,
    appSecret: config.consumer_secret,
    accessToken: config.access_token,
    accessSecret: config.access_token_secret}
);

async function postQuote() {
	const quote = getRandomQuote();
	if(quote) {
		await twitterClient.v2.tweet(quote);
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
targetTime.setHours(2)
targetTime.setMinutes(2)
targetTime.setSeconds(0)
targetTime.setMilliseconds(0)

let currentTime = new Date()

diffTime = targetTime - currentTime
if (diffTime < 0) {
    diffTime = diffTime + MS_IN_DAY
}
console.log(`[${currentTime.toISOString()}]First quote in ${diffTime/(1000*60)} minutes...`);

setTimeout(startQuoteBot, diffTime)