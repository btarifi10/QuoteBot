import wikiquotes

AUTHOR = 'The Prophet'
TEXTFILE1 = 'theprophet.txt'

quotes = wikiquotes.get_quotes(AUTHOR, "english")

print("Number of quotes: ", len(quotes))

with open(TEXTFILE1, 'w') as f1:
    for quote in quotes:
        # print(quote)
        f1.write(quote)
        f1.write('\n')