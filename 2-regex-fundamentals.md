# 2. Regex Fundamentals
### Basic String Matching
You can still search for a literal string i.e. the exact letter(s)/word(s) that you want to find. So, to find the gene name 'HDAC1', you would type:

```
HDAC1
```
Using one of the programs mentioned above (or your favourite text editor, if you already have one!), try it out on the example file `example.gff`. If you're using an editor, remember to make sure that you have your searches switched to regex mode.

Gene names are one example of where the letters in your target string might be in upper or lower case (or a mix of the two) - DNA and RNA sequences are another. You should consider this when doing your search: most search functions/programs provide an option to switch case sensitivity on and off. For example, when using `grep` on the command line, the `-i` option activates case insensitivity.

> #### Exercise 2.1
> Find every instance of a histone deacetylase (HDAC) in the file, based on the gene name.  
Are there any potential problems with your search? Think about how you might make your search as specific as possible, to avoid spurious matches.

### Sets and Ranges
What if we want to find only `hdac1` and `hdac2`? You could do this in two separate searches, but getting everything you need in a single search might be better for a number of reasons: it's faster; it will preserve the order of the results, if you are extracting them to a separate file; if you learn how to do it for two strings, you can apply the same approach to ten, 100, etc; and it's more satisfying!

Groups of characters that can be matched in a certain position are specified between `[]`. For example,

```
[bfr]oot
```
will match 'boot', 'foot', and 'root', but not 'loot', or 'moot'. Only a single character inside the `[]` will be matched, so the pattern above will not (completely) match 'froot' or 'rboot' either.

We can apply this approach to match only `HDAC1` and `HDAC2` in our example file, with the regex below.

```
HDAC[12]
```

The set of characters specified inside `[]` can be a mix of letters, numbers, and symbols. So,

```
[&k8Y]
```
is a valid set.

What if we want to match any uppercase letter? Applying what we've learned already, we *could* use the set

```
[ABCDEFGHIJKLMNOPQRSTUVWXYZ]at
```
to match any string beginning with an upper case letter, followed by 'at' e.g. 'Cat', 'Bat', 'Mat', etc. But that's a lot of typing (30 characters to match only three in the string), and we can instead specify ranges of characters in `[]` with `-`. So, to match the same strings as before, our regex can instead look like this:

```
[A-Z]at
```

Only seven characters now - that's much better! All lower case letters can be matched with the set `[a-z]`, and digits with `[0-9]`. 

_Note: Here, we will discuss only characters that fall inside the ASCII set - a limited set of roman alphabet letters, numbers, and symbols, which includes almost everything commonly used in English, but not accented characters (ü, é, ø, etc) or many specialised symbols (e.g. €, ¿, ±). Many regular expression engines provide a 'Unicode mode', often switched on with the 'u' flag, which will allow you to specify and match the full range of Unicode characters. This includes most alphabets, symbols, and even emojis._

> #### Exercise 2.2
> a) In total, how many lines mention HDAC 1-5 in `example.gff`?  
> b) Which of the following expressions could you use to match any four-letter word beginning with an uppercase letter, followed by two vowels, and ending with 'd'?  
> 
> ```	
> 	i) [upper][vowel][vowel]d  
> 
> 	ii) [A-Z][a-u][a-u]d
> 
> 	iii) [A-Z][aeiou][aeiou]d
> 
> 	iv) [A-Z][aeiou]*2;d
> ``` 
> c) Try playing around with the character ranges that you have learned above. What does `[A-z]` evaluate to? What about `[a-Z]`? Can you create a range that covers all letter and number characters?

Ranges don't have to include the whole alphabet or every digit - we can match only the second half of the alphabet with

```
[N-Z]
```

and only the numbers from 5 to 8 with

```
[5-8]
```

We can specify multiple ranges together in the same set, so matching 'a', 'b', 'c', 'd', 'e', 'f', or any digit can be done with

```
[a-f0-9]
```

But if we're using the `-` symbol to specify a range of characters, how do we include the literal '-' symbol in a set to be matched? To do this, the `-` should be specified at the start of the set. So

```
[-A-K]
```

will match '-' as well as any uppercase letter between 'A' and 'K'.

### Inverted sets
The last thing to tell you about sets and ranges (for now), is that we can also specify a set or range of characters to *not* match in a position. This is achieved with the `^` symbol at the beginning of the set.

```
201[^269]
```

will match '2010', '201K', '201j', etc, but not '2012', '2016', or '2019'. In contrast to `-`, which is only taken literally when at the start of the set, `^` only takes a special meaning at the start of a set - it is treated literally if it appears anywhere else in the set. If you want to invert a set that should include the `-` symbol, start the set with `^-` followed by whatever other characters you don't want to match.

> #### Exercise 2.3
> Use an inverted set to only match the human autosomes (chr1-22), i.e. filtering out chromosomes chrX, chrY and chrM. How many records with autosomes can you find in file `example.gff`?
