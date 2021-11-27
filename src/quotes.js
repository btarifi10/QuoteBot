const { Client } = require("quotebook-api");
const client = Client({ apiKey: "api-key122345" });

// Promise
client
  .fetchByAuthor({ q: "Gibran"})
  .then(response => {
      quotes = response.data.result
      console.log(quotes.length)
      console.log(quotes)
  })
  .catch(e => console.log(e));
