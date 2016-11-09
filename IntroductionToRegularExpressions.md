# Introduction to Regular Expressions
## What is a regular expression?
A regular expression (regex) is a string of characters defining a pattern that should be searched for in a block of text. A regex can be constructed to allow multiple possible matches, while restricting other possibilities, making the approach considerably more powerful and precise than the simple 'CTRL+F' or 'Find/Replace' operations that you might be familiar with from word processing/web browser software. It's also possible to use regular expressions to specify parts of the search pattern that will be kept in the replacement string of a substitution operation.

### Illustrative Example
Imagine that you have a long text document. The document contains a lot of numbers - years (2014, 2016, 1998, etc), digits (9, 4, 58, etc), and a single phone number (i.e. twelve digits). You need to find the phone number, but it's buried in this large body of text, amongst many other numbers. You can't remember much about the phone number (like what digit(s) it starts with), you can't just randomly search strings of digits with `CTRL+F`/`Find/Replace`, because there's far too many possible combinations (one *trillion* twelve-digit numbers!) and simply performing ten individual searches for the digits from `0` to `9` finds you a lot of unwanted results.

You *could* run one of these searches for an individual digit, then manually click through each result, until you eventually find the phone number. Or you could simply scroll through the document, scanning, by eye, for something that looks like a phone number. But that is likely to take a *long* time, is really boring, and anyway it's 4:55 on Friday afternoon and you need to find that phone number and get upstairs before all the pizza is gone!

This is where a regular expression search will make things much easier for you! You know that you need to find twelve digits in succession, so you need to write an expression that represents twelve digits. Good news! With regular expressions, you can search for any digit using the 'token' `\d`. So, to find the phone number, you only need to provide the expression `\d\d\d\d\d\d\d\d\d\d\d\d`* to your regex search tool. The phone number will pop right out, leaving you with time to head upstairs and wait hungrily for the pizza to arrive!

\* the regular expression language actually allows you to avoid such a long string of the same token/character, but we will come to that later on.

## Regular Expression Engines
In order to perform a regex search, you need to provide the expression to a program that can interpret it. Such tools are known as regular expression engines. Unfortunately, there are multiple different 'flavours' of regex engines, which each work slightly differently. Fortunately, the core rules, which will probably address 99.9% of your text-searching needs, are pretty much common to all of them. It's these that we will cover in this course.

## How can I use Regular Expressions?
### Text Editors
In order to be able to use regular expressions, you need to use a program that provides an engine to interpret them. Most text editors will provide regex search/replace functionality. If you use Windows, we highly recommend the freely-available editor 'Notepad++', available at [https://notepad-plus-plus.org](https://notepad-plus-plus.org). For Mac, TextWrangler is a good generic text editor, free from [http://www.barebones.com/products/TextWrangler/](http://www.barebones.com/products/TextWrangler/) or the App Store. For Windows, Mac, and Linux, Sublime Text is another good option, available from [https://www.sublimetext.com](https://www.sublimetext.com).

Usually, you will need to specify that you want to use regular expression searching instead of the normal plain text searching that you are probably already familiar with. When you open up the `Find/Replace` interface in your editor, you should look for an option with a label like "mode", "grep-like", "regular expression" or "regex", and use this to control the type of searching that you want to do.

### Command Line
In addition, several Unix command line tools are commonly available that use regular expressions, for searching (e.g. `grep`/`egrep`) and replacement/substitution (e.g. `sed`, `awk`, `perl -e`).

## 1. Regex Fundamentals
### Basic String Matching
You can still search for a literal string i.e. the exact letter(s)/word(s) that you want to find. So, to find the gene name 'hdac1', you would type:

```
hdac1
```
Using one of the programs mentioned above (or your favourite text editor, if you already have one!), try it out on the example file [TODO]**EXAMPLE FILE NAME HERE**. If you're using an editor, remember to make sure that you have your searches switched to regex mode.

Gene names are one example of where the letters in your target string might be in upper or lower case (or a mix of the two) - DNA and RNA sequences are another. You should consider this when doing your search: most search functions/programs provide an option to switch case sensitivity on and off. For example, when using `grep` on the command line, the `-i` option activates case insensitivity.

> #### Exercise 1.1
> Find every instance of a histone deacetylase (HDAC) in the file, based on the gene name.  
Are there any potential problems with your search? Think about how you might make your search as specific as possible, to avoid spurious matches.

### Sets and Ranges
What if we want to find only `hdac1` and `hdac2`? You could do this in two separate searches, but getting everything you need in a single search might be better for a number of reasons: it's faster; it will preserve the order of the results, if you are extracting them to a separate file; if you learn how to do it for two strings, you can apply the same approach to ten, 100, etc; and it's more satisfying!

Groups of characters that can be matched in a certain position are specified between `[]`. For example,

```
[bfr]oot
```
will match 'boot', 'foot', and 'root', but not 'loot', or 'moot'. Only a single character inside the `[]` will be matched, so the pattern above will not (completely) match 'froot' or 'rboot' either.

We can apply this approach to match only `hdac1` and `hdac2` in our example file, with the regex below.

```
hdac[12]
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

> #### Exercise 1.2
> [TODO] a few exercies matching gene names with sets and ranges

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

> #### Exercise 1.3
> [TODO] Exercise(s) testing understanding of inverted sets

## 2. Tokens and Wildcards


## Recommended Links
- [regular-expressions.info](http://www.regular-expressions.info) - the definitive guide to regex.
- [Regexper](https://regexper.com/) - a handy interface to visualise how your regex will match a pattern.
- [Regex Crossword]() - play crosswords with regular expressions. Provides very good practise.
