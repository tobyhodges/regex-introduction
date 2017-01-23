# Introduction to Regular Expressions
Author: Toby Hodges

## What is a regular expression?
A regular expression (regex) is a string of characters defining a pattern that should be searched for in a block of text. A regex can be constructed to allow multiple possible matches, while restricting other possibilities, making the approach considerably more powerful and precise than the simple 'CTRL+F' or 'Find/Replace' operations that you might be familiar with from word processing/web browser software. It's also possible to use regular expressions to specify parts of the search pattern that will be kept in the replacement string of a substitution operation.

### Illustrative Example
Imagine that you have a long text document. The document contains a lot of numbers - years (2014, 2016, 1998, etc), digits (9, 4, 58, etc), and a single phone number (i.e. twelve digits). You need to find the phone number, but it's buried in this large body of text, amongst many other numbers. You can't remember much about the phone number (like what digit(s) it starts with), you can't just randomly search strings of digits with `CTRL+F`/`Find/Replace`, because there's far too many possible combinations (one *trillion* twelve-digit numbers!) and simply performing ten individual searches for the digits from `0` to `9` finds you a lot of unwanted results.

You *could* run one of these searches for an individual digit, then manually click through each result, until you eventually find the phone number. Or you could simply scroll through the document, scanning, by eye, for something that looks like a phone number. But that is likely to take a *long* time, is really boring, and anyway it's 4:55 on Friday afternoon and you need to find that phone number and get upstairs before all the pizza is gone!

This is where a regular expression search will make things much easier for you! You know that you need to find twelve digits in succession, so you need to write an expression that represents twelve digits. Good news! With regular expressions, you can search for any digit using the 'token' `\d`. So, to find the phone number, you only need to provide the expression `\d\d\d\d\d\d\d\d\d\d\d\d`* to your regex search tool. The phone number will pop right out, leaving you with time to head upstairs and wait for the pizza to arrive!

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
In the introductory example we introduced the `\d` token, used to represent any single digit. In this regard, the two regular expressions below are equivalent.

```
[0-9]
\d
```

### Tokens and the Backslash

Tokens in general are shorter form ways of describing standard, commonly-used sharacter sets/classes. The table below describes the tokens available for use in regex.

Token | Matches                                                 | Set Equivalent |
------|---------------------------------------------------------|----------------|
`\d`  | Any digit                                               | `[0-9]`        |
`\s`  | Any whitespace character (space, tab, newlines)         | `[ \t\n\r\f]`  |
`\w`  | Any 'word character' - letters, numbers, and underscore | `[A-Za-z0-9_]` |
`\b`  | A word boundary character                               | `[^\w]`        |
`\D`  | The inverse of `\d` i.e. any character except a digit   | `[^0-9]`       |
`\S`  | Any non-whitespace character                            | `[^ \t\n\r\f]` |
`\W`  | Any non-word character                                  | `[^A-Za-z0-9_]`|

Notice that these tokens have a common sytax - a backslash character '\' followed by a letter establishing the set (lowercase) or inverse of a set (uppercase) being represented. The backslash is important in regular expressions, and in programming/command line computing in general. It is often used as an 'escape character' - it signifies to a program/interpreter that the character that follows the backslash should be treated in some special way. In regex, the backslash has a slightly confusing role, in that it is used as both an escape character and as a way of conferring special meaning on characters that would otherwise be treated literally. So, for tokens the inclusion of a backslash changes the meaning of the `w`, `s`, `b`, and `d` characters from "match exactly the character 'w'" and so on, to "match any character in this set/class". But for other characters that already have a special meaning (e.g. `.`, `$`, `[`, etc - we will discuss these more later), the inclusion of a backslash in the preceding position in a regex tells the engine "treat this character literally, instead of interpreting it with a special value". 

This even extends to far as to the backslash character itself - you can specify that you want to match a literal backslash, by preceding that backslash character with - you guessed it! - a backslash i.e. with `\\`.

> #### Exercise 2.1
> Exercise(s) testing understanding of tokens

### Word Boundaries

The `\d`, `\w`, and `\s` tokens are reasonably easy to understand - each one represents a clear set of characters. The `\b` token is more interesting - it is used to match what is referred to as a 'word boundary', and can be used to ensure matching of whole words only. For example, we want to find every instance of 'chromosome1' and 'chromosome2' in the file [TODO] EXAMPLE_FILE. Using what we've already learned, we can design the regex

```
chromosome[12]
```

which will match either of the two target strings. However, this regex will also match all but the last character of 'chromosome13' and 'chromosome22', which is not what we want*. How can we be sure that we will only match the two chromosome identifiers that we want, without additional digits on the end? We could add a space character to the end of the regex. But what if the target string appears at the end of a line? Or before a symbol/delimiter such as ';' or '.'? These strings will be missed by our regex ending with a space. 

This is where the `\b` token comes in handy. 'Word boundary' characters include all of the options described above - symbols that might be used as field delimiters, periods and commas, newline characters, plus the special regex characters `^` and `$`, which refer to the beginning and end of a string respectively (more on these in a moment). So, by using the regex

```
\bchromosome[12]\b
```

we ensure that we will only get matches to 'chromosome1' and 'chromosome2' as whole words, regardless of whether they are flanked by spaces, symbols, or the beginning or end of a line.

> #### Exercise 2.2
> Multiple-choice exercise on word boundaries

### The `.` Wildcard

As well as the set tokens described above, there is also the more general wildcard `.`, which can be used to match any single character. Although it can be very helpful at times, it is recommended to use a more specific token/set when possible - we will discuss more about this in the next section.

### `^`Start and End`$`
The `^` and `$` symbols are used in a regex to represent the beginning and end of the searched line - they are refered to as 'anchor' characters. This can be extremely helpful when searching for lines that begin with a particular string/pattern, but where that pattern might also be found elsewhere in the lines. 

For example, in the example SAM file, 'example.sam', there are several header lines before the main body of individual alignments. These header lines begin with the '@' symbol, which is also contained within the quality strings and other fields of the alignment lines that make up the bulk of the file. If we search only with `@`, we won't be able to pull out only the header lines, so instead we can use the regex

```
^@
```

to capture only the header lines. A similar approach can also be useful when searching for particular primer/adapter sequences in high-throughput DNA sequencing data.

> #### Exercise 2.3
> Anchoring exercise

## 3. Repeated Matches
Now that we've learned how to account for uncertainty of the characters that should be matched by a regex, it's time to focus on how to account for uncertainty in the *length* of the patterns that we would like to match.

For example, imagine that we are working with a large list of files, a collection of several different file formats. We have FASTA files (extension `.fasta`), BAM files (`.bam`), text files (`.txt`), and BED files (`.bed`). What if we want to match the complete filename of all of the text files? There are files called 'table1.txt', 'table20.txt', 'samples.txt', 'Homo_sapiens.txt', and so on, i.e. the filenames vary in length and lack a standard structure/format. So we can't construct a working regex to capture all of these '.txt' files, using only the character sets and ranges that we've learned up to now.

### Repeat Modifiers
The symbols `+`, `?`, and `*` can be used to control the number of times that a character or set should be matched in the pattern. The behaviour of each is summarised in the table below.

Symbol | Behaviour                                     | Example | Matches  | Doesn't Match |
-------|-----------------------------------------------|---------|----------|---------------|
`+`    | Match one or more of preceding character/set  | `AGC+T` | AGCCCT   | AGT           |
`?`    | Match zero or one of preceding character/set  | `AGC?T` | AGT      | AGCCT         |
`*`    | Match zero or more of preceding character/set | `AGC*T` | AGCCCCCT | AGG           |

So, `bo?t` will match 'bt' and 'bot' only, `bo+t` will match 'boot', 'bot', 'boooot', and so on, and `bo*t' will match 'bt', 'bot', 'boot', 'booot', and so on. These modifiers can also be applied to sets of characters, so the regex

```
f[aeiou]+nd
```

will match 'find', 'found', and 'fiuoaaend'. Note that the whole class can be repeated, and it is not only repeats of the same character that match i.e. the regex

```
d[efor]*med
```

will match 'deformed', as well as 'dmed', 'doomed', and 'doooooooooooomed'. It also important to be aware that the modifiers are 'greedy', which means that the regex engine will match as many characters as possible before moving on to the next character of the pattern. [TODO] Greediness example

> #### Exercise 3.1
> repeat modifiers exercise

### Specifying Repeats
In addition to the modifiers above, which allow the user to specify whether to match, zero, one, or an arbitrary multitude of a character/set, it is also possible to match only a certain number of repeats, or within a certain range of numbers of repeats, using `{}`.

```
GCA{3}T
```

matches 'GCAAAT' only, while

```
GC[AT]{3}T
```

matches 'GCATAT', 'GCTTTT', and 'GCTAAT', but not 'GCTAT', 'GCATT', or 'GCp)T'. As well as an exact number of repeats to match, a range can also be specified with `{n,m}`, where `n` is the minimum and `m` the maximum number of matches allowed in the pattern. So, 

```
AG[ACGT]{4,10}GC
```

matches any sequence between four and ten nucleotides, flanked by 'AG' on one side and 'GC' on the other.

> #### Exercise 3.2
> Exercise testing use of `{}`, and asking learner to investigate what happens when they omit either minimum or maximum number of matches.

Specifying only one of these limits, while retaining the comma in the appropriate position, allows you to control for a only an upper or lower limit to the number of repeats. So,

```
GC[A]{3,}GC
```

matches 'GCAAAGC', 'GCAAAAAAAAGC', and any other string starting and ending with 'GC', with more than two 'A's in between. Conversely,

```
GCA{,4}GC
```

matches 'GCGC', 'GCAGC', 'GCAAGC', and so on, but won't match 'GCAAAAAAGC' or any other combination containing a run of more than four 'A's between flanking 'GC' substrings.

## 4. Capture Groups and References
One of the most common uses of regular expressions is in string replacement, or substitution, where the patterns found will be replaced by some other string - this usage is similar again to the 'Find and Replace' functionality of word processors that we mentioned in the introduction. The advantage that regular expressions provide in this context is that they can use all or part(s) of the matched string in the replacement, allowing matched patterns to be rearranged, added to, and given new context, without the need for prior knowledge of the actual pattern that will be found. 

To understand the difference between this and the functionality of a standard, literal 'Find/Replace' tool, consider the following example. You have been given a FASTA file of protein sequences in the following format

```
>GX3597KLM "Homo sapiens"
MQSYASAMLSVFNSDDYSPAVQENIPALRRSSSFLCTESCNSKYQCETGENSKGNVQDRVKRPMNAFIVW
SRDQRRKMALENPRMRNSEISKQLGYQWKMLTEAEKWPFFQEAQKLQAMHREKYPNYKYRPRRKAKMLPK
NCSLLPADPASVLCSEVQLDNRLYRDDCTKATHSRMEHQLGHLPPINAASSPQQRDRYSHWTKL

>GK9113FGH "Homo sapiens"
MRPEGSLTYRVPERLRQGFCGVGRAAQALVCASAKEGTAFRMEAVQEGAAGVESEQAALGEEAVLLLDDI
MAEVEVVAEEEGLVERREEAQRAQQAVPGPGPMTPESAPEELLAVQVELEPVNAQARKAFSRQREKMERR
RKPHLDRRGAVIQSVPGFWANVIANHPQMSALITDEDEDMLSYMVSLEVGEEKHPVHLCKIMLFFRSNPY
FQNKVITKEYLVNITEYRASHSTPIEWYPDYEVEAYRRRHHNSSLNFFNWFSDHNFAGSNKIAEILCKDL
WRNPLQYYKRMKPPEEGTETSGDSQLLS

>GF7745PUP "Mus musculus"
MGRLVLLWGAAVFLLGGWMALGQGGAAEGVQIQIIYFNLETVQVTWNASKYSRTNLTFHYRFNGDEAYDQ
CTNYLLQEGHTSGCLLDAEQRDDILYFSIRNGTHPVFTASRWMVYYLKPSSPKHVRFSWHQDAVTVTCSD
LSYGDLLYEVQYRSPFDTEWQSKQENTCNVTIEGLDAEKCYSFWVRVKAMEDVYGPDTYPSDWSEVTCWQ
RGEIRDACAETPTPPKPKLSKFILISSLAILLMVSLLLLSLWKLWRVKKFLIPSVPDPKSIFPGLFEIHQ
GNFQEWITDTQNVAHLHKMAGAEQESGPEEPLVVQLAKTEAESPRMLDPQTEEKEASGGSLQLPHQPLQG
GDVVTIGGFTFVMNDRSYVAL

>GD8332BAG "Homo sapiens"
MEELTAFVSKSFDQKSKDGNGGGGGGGGKKDSITYREVLESGLARSRELGTSDSSLQDITEGGGHCPVHL
FKDHVDNDKEKLKEFGTARVAEGIYECKEKREDVKSEDEDGQTKLKQRRSRTNFTLEQLNELERLFDETH
YPDAFMREELSQRLGLSEARVQVWFQNRRAKCRKQENQMHKGVILGTANHLDACRVAPYVNMGALRMPFQ
QVQAQLQLEGVAHAHPHLHPHLAAHAPYLMFPPPPFGLPIASLAESASAAAVVAAAAKSNSKNSSIADLR
LKARKHAEALGL

>GK3091TFB "Mus musculus"
MAILFAVVARGTTILAKHAWCGGNFLEVTEQILAKIPSENNKLTYSHGNYLFHYICQDRIVYLCITDDDF
ERSRAFNFLNEIKKRFQTTYGSRAQTALPYAMNSEFSSVLAAQLKHHSENKGLDKVMETQAQVDELKGIM
VRNIDLVAQRGERLELLIDKTENLVDSSVTFKTTSRNLARAMCMKNLKLTIIIIIVSIVFIYIIVSPLCG
GFTWPSCVKK

>GK3141YRK "Pan troglodytes"
...

```

This is helpful, because you have in the sequence header lines (the lines starting with '>') what looks like a unique identifier as the sequence ID string, and some additional information about species in the description, but there are two potential problems, the species string is wrapped in quotes, and there are spaces in the sequence ID line. What we'd really like to have, is the species name - without quotes - attached to the ID string with underscores, to make sure that it will be retained in any further processing steps that might otherwise strip away the additional description in the sequence header line.

We can match the species name in each header line, with the following regex:

```
[A-Z][a-z]+ [a-z]+
```

which is a good start. But, now we need to consider how to make sure that we keep these species names during the replacement. In a standard "Find/Replace" operation, as well as specifying exactly the text that we want to find (as discussed before), we also specify exactly the text that we will replace it with. So, to we can find _"Pan troglodytes"_ and replace it with _Pan\_troglodytes_, but if our file contains 100 different species names, we would need to manually perform 100 of these operations.

Regular expressions provide the capability to identify and store parts of a matched pattern, for reuse in the replacement string. This means that we can find and replace all of those species names in a single operation, while maintaining the specific strings that we still need. To do this, we need to use _capture groups_.

In a regex, a capture group is established in with `()` parentheses, and referred to in the replacement string with `\N`, where `N` is an integer (1-9) signifying which group in the regex should be substituted in at the specified position. Captured groups are counted from left to right. This should be made clearer with an example below:



## 5. Alternative Matches

## Recommended Links
- [regular-expressions.info](http://www.regular-expressions.info) - the definitive guide to regex.
- [Debuggex](https://www.debuggex.com) - a handy interface to visualise how your regex will match a pattern.
- [Regex Crossword]() - play crosswords with regular expressions. Provides very good practise.
