# 8. Solutions


### Chapter 2

#### Exercise 2.1

```
HDAC
# or, for a more specific match
Name=HDAC
```

#### Exercise 2.2

a) 82 (using the regex `Name=HDAC[1-5][^0-9]`)  
b) option iii) fits the description. You might also have chosen option ii), which would match the described pattern, but would also match other non-vowel letters in the middle two positions.  
c) `[A-z]` matches all letter characters (both upper and lower case). `[a-Z]` is an invalid set. `[A-9]` will match any letter or digit character.

#### Exercise 2.3

```
chr[^XYM]
```
There are 897 records matching this regular expression. In fact, there are only 895 lines beginning with `chr[^XYZ]`, but two other lines also match the regex above because they contain the string 'chromosome'. To avoid matching these, anchor the regex to the beginning of the line with `^` i.e. `^chr[^MXY]` (see chapter 3).

### Chapter 3

#### Exercise 3.1

```
\d\d\.\d\d\.\d\d\d\d
```

There are 25 matches in the file `person_info.csv` (every even record).

Note that there are a few caveats with that regex, such that it will also match strings like 131.01.20171 or 99.99.9999.

#### Exercise 3.2

```
\b\d\d\.\d\d\.\d\d\d\d\b
```

Note that this prevents matching strings like 131.01.20171, but still allows non-sensical dates such as 99.99.9999.

#### Exercise 3.3

While both regular expressions will prevent leading and succeeding digits, the regular expression `\D\d\d\d\d\D` won't
work if the four digits appear at the beginning or end of the string. That is because the `\D` tokens MUST
match a character.

#### Exercise 3.4

```
^>.*transcript_biotype:protein_coding
```

There are 17 matches in the file `example_protein.fasta`. _Note: be careful when using `>` in a regular expression on the command line - the `>` symbol has a special meaning in many command line environments, and using it can result in accidentally wiping the content of files etc._

### Chapter 4

#### Exercise 4.1
a) __iv)__ the regex will match all of the strings i) - iii)  
b) `ATG?CT+CG`

#### Exercise 4.2

```
WL{3}Y
WL{2}Y
WL{1}Y
WL{1,4}Y
```

### Chapter 5

#### Exercise 5.1

Use the regex `^(ENSP\d.+)` and substitute with `>\1`.

Note that we explicitly match a digit character `\d`. This is because E, N, S and P are all character of the amino acid alphabet and thus `ENSP` can wrongly match protein sequences.

#### Exercise 5.2

Use the regex `Pictures\/(France-2015)\/` and substitute with `shared/vacation-pics/\1-`.

### Chapter 6

#### Exercise 6.1

`[Ff]irst [Ss]treet|1st [Ss]treet`

`(Fir|fir|1)st [Ss]treet`

#### Exercise 6.2

a) 
AGGCCA: 25  
TGTGAC: 29  
GCTGAC: 19

b)  
regex: `^(AGGCCA|TGTGAC|GCTGAC)([ACGTN]+\n\+\n)`  
replacement string: `\2` (`$2`)

c)  
regex: `^(AGGCCA|TGTGAC|GCTGAC)([ACGTN]+\n\+\n).{6}`
replacement string: `\2` (`$2`)

d)  
regex: `^(@VFI-SQ316.+:)GCGCTG\n(AGGCCA|TGTGAC|GCTGAC)([ACGTN]+\n\+\n).{6}`  
replacement string: `\1\2\n\3`
