import requests, json, os
from dotenv import load_dotenv

load_dotenv() 

TOKEN = os.getenv('PAPERQUOTES_TOKEN')
AUTHOR = 'Einstein'
TEXTFILE = 'paperquotes.txt'

PAPERQUOTES_API_ENDPOINT = "https://api.paperquotes.com/apiv1/quotes/?author={}".format(AUTHOR)

response = requests.get(PAPERQUOTES_API_ENDPOINT, headers={'Authorization': 'TOKEN {}'.format(TOKEN)})

if response.ok:

    quotes = json.loads(response.text).get('results')

    print("Size: ", len(quotes))

    with open(TEXTFILE, 'w') as f:
        for quote in quotes:
            # f.write(quote.get('quote'))
            # f.write('\n')
            print(quote.get('quote'))
