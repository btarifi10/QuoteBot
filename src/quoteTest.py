import requests, json, os
from dotenv import load_dotenv

load_dotenv() 

TOKEN = os.getenv('PAPERQUOTES_TOKEN')
AUTHOR = 'Gibran'
TEXTFILE = 'quotable.txt'

QUOTABLE_API_ENDPOINT = "https://api.quotable.io/search/quotes?query={}&fields=author".format(AUTHOR)

response = requests.get(QUOTABLE_API_ENDPOINT)

if response.ok:

    quotes = json.loads(response.text).get('results')

    print("Size: ", len(quotes))

    with open(TEXTFILE, 'w') as f:
        for quote in quotes:
            f.write(quote.get('content'))
            f.write('\n')
            print(quote.get('content'))
