# Notes from György Szy

So, I think you would not appreciate if I just google for the solution. Well, okay, lets do it the long way.

I set up a simple jest file for testing.

Also I presume, a simple html webpage will be enough? convToText will be included with a script tag.
("create an application"?)

## names of numbers

I use the wiki https://en.wikipedia.org/wiki/Names_of_large_numbers
to find out exact names of bigger numbers.

Every 3 digits can be processed with the block's name.
It is not clear, how big or small the number may be.
Let's assume we will process numbers until Sextillion (10^21) but prepare the code to work farther if needed.

Just relaized from the examples, that two-digit hundreds are needed, if there is no ten- or hundredthousands.
(1999). I assume that this is needed also, if the number has millions or biggers also (for example 10000001999)

Had some problem with spaces... Lots of if conditions are needed to check if we need or not...
After some time, I decided to add extra spaces every time, and remove them just before returning the text.

## Exceeding MAX_SAFE_INTEGER

So, if the number is bigger than the max safe integer value (9007199254740991), in that case it will be
rounded, so it will not be accurate.

If there is a need for that, the process can be transformed in two ways:
a) change the input into TEXT filed, and filter for numbers only, and process it as a text
or
b) use bigInt numbers.

As it was not required, right now my solution will return a text "number is too big to handle safely."

## The "and"

It seems that an "and" is needed if the last two digit is not zero, so before the "twenty-one" part.
It is not clear if the "and" is needed at millions too?
(for example: three hundred **and** twenty-two million two hundred?) I assume yes.

Also a question: what about 1020? It is one thousand twenty or one thousand and twenty?
(so, do we need the "and" when there are bigger parts and the twenty?)
I assume yes. Special case 43234234200003 is ... and three.
