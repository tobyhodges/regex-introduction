# 4. Repeated Matches
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

will match 'deformed', as well as 'dmed', 'doomed', and 'doooooooooooomed'. It also important to be aware that the modifiers are 'greedy', which means that the regex engine will match as many characters as possible before moving on to the next character of the pattern.

> #### Exercise 4.1
> a) Which of the follow strings will be matched by the regular
> expression `MVIA*CP`?
> 
>```
> 	i) MVIAACP  
> 
> 	ii) MVICP  
> 
> 	iii) MVIACP  
> 
> 	iv) all of the above
> ```
> b) Write a regular expression to match the string
> 
> "ATGCTTTCG"
> 
> and
> 
> "ATCTCG"
> 
> but *not*
> 
> "ATGGCCG"
> 


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

### Grouping
In some circumstances, you will need to specify exactly what it is that you would like to repeat within a regex. The `+`, `?`, and `*` modifiers above apply by default only to the character/set that immediately precedes them in the regex. But what if you would like to match multi-character repeats? Or make a substring in the pattern optional? To apply a modifier to a whole group of characters/sets, wrap the group in `()` parentheses.

For example, in the string  'rain wind rainrain sunshine', we can match 'rain' and 'rainrain' with the regex `(rain)+`. This kind of grouping with `()` is used in a few different ways, as we will discover in the next couple of chapters.

> #### Exercise 4.2
> use `{}` to search `example_protein.fasta` for trytophan (W) 
> followed by tyrosine (Y), with an increasing number of leucine (L)
> residues in between. Start by searching for this pattern with three leucines (i.e. 'WLLLY'), then reduce this to two, and one. Is this working as you expect? How would you search for a range of lengths of the leucine repeat? Try searching for any patterns with at between one and four leucines.  
> What happens if you leave out the upper limit inside the `{}`? Or the lower limit? Can you leave out both?

Specifying only one of these limits, while retaining the comma in the appropriate position, allows you to control for a only an upper or lower limit to the number of repeats. So,

```
GC[A]{3,}GC
```

matches 'GCAAAGC', 'GCAAAAAAAAGC', and any other string starting and ending with 'GC', with more than two 'A's in between. Conversely,

```
GCA{,4}GC
```

matches 'GCGC', 'GCAGC', 'GCAAGC', and so on, but won't match 'GCAAAAAAGC' or any other combination containing a run of more than four 'A's between flanking 'GC' substrings. This syntax, where the minimum number of matches is left blank, is only valid in a limited number of programs/environments.

