# 5. Capture Groups and References
One of the most common uses of regular expressions is in string replacement, or substitution, where the patterns found will be replaced by some other string - this usage is similar again to the 'Find and Replace' functionality of word processors that we mentioned in the introduction. Beyond the potential for "fuzzy" finding, a major advantage that regular expressions provide in this context is that they allow all or part(s) of the matched string to be re-used in the replacement. This means matched patterns can be rearranged, added to, and given new context, without the need for prior knowledge of the specific pattern that will be found. 

To understand the difference between this and the functionality of a standard, literal 'Find/Replace' tool, consider the following example: you have been given a FASTA file of protein sequences in the following format

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
[ many more records follow... ]

```

In the sequence header lines (the lines starting with '>'), you have what looks like a unique identifier as the sequence ID string, and some additional information about species in the description. These are helpful for find/replace, as they allow us to search the large file for sequences with a particular identifier or that relate to a particular species. But there are two potential problems: first, the species string is wrapped in quotes, which can cause problems in downstream analysis; and there are spaces in the sequence ID line, which can often result in the information after the first space being lost when the data is processed by a lot of software. To avoid these issues, what we'd really like to have is the species name - without quotes - attached to the ID string with underscores. This should make sure that all relevant information will be retained in any further processing steps.

We can match the species name in each header line, with the following regex:

```
[A-Z][a-z]+ [a-z]+
```

which is a good start. But, now we need to consider how to make sure that we keep these species names during the replacement. In a standard "Find/Replace" operation, as well as specifying exactly the text that we want to find (as discussed before), we also specify exactly the text that we will replace it with. So, to we can find _"Pan troglodytes"_ and replace it with _Pan\_troglodytes_, but if our file contains 100 different species names, we would need to manually perform 100 of these operations.

Using regular expressions, we can identify and store parts of a matched pattern for reuse in the replacement string. This means that we can find and replace all of those species names in a single operation, while maintaining the specific strings that we still need. To do this, we need to use _capture groups_.

As we saw in the previous chapter, a group is established in a regular expression with `()` parentheses. When matched, these groups can be referred to in the replacement string with `\N`, where `N` is an integer (1-9) signifying which group in the regex should be substituted in at the specified position\*. Captured groups are counted from left to right. This should be made clearer with an example below:

```
group_1, group_2, group_3
```

In this case, we want to rearrange the parts of the string above, so that we have 'group 3' first, followed by 'group_1' twice, and then 'group_2'. Using what we've already learned, we can match each 'group_x' substring with the one of the regexes below

```
group_\d

# or

group_[123]

# or

group_[0-9]
```

so we could match the whole string as follows:

```
group_\d, group_\d, group_\d
```

However, in order to rearrange the parts in a replacement string, we need to capture them individually with `()` parentheses. Using the following regex:

```
(group_\d), (group_\d), (group_\d)
```

we could create a rearranged replacement string with

```
\3, \1, \1, \2

# returns "group_3, group_1, group_1, group_2"
```

or, to wrap each group in quotation marks:

```
"\1", "\2", "\3"

# returns "group_1", "group_2", "group_3"
```

> __Note__  
> \* Here we are using the `\1`, `\2`  notation for referencing
> captured groups, but you will often see `$1`, `$2` etc used instead.
> This is the case when using regular expressions in Perl, and in many
> text editors e.g. Atom. Be wary of the different tokens and 
> wildcards used for regexes in different environments - it can easily
> trip you up. You should always try out a regex replacement before
> running it on any large volume of data/text, and make sure that you
> have a backup so that you can easily revert any unintended changes!

Using this approach, you can capture up to nine different groups and re-use as many of them as you like in your replacement string. This is really helpful when reformatting large files e.g. to remove additional characters, which can otherwise be very fiddly and time-consuming.

Now we can return to our FASTA sequence header example introduced at the beginning of this section. 
How can we use capture groups to reach our aim of 
attaching the species names to the sequence IDs, removing the quotation marks along the way? 
First, we should identify the groups that we need to capture in the regex matching the species names:

```
[A-Z][a-z]+ [a-z]+ # matches the species names

([A-Z][a-z]+) ([a-z]+) # captures genus & species separately as \1 and \2
```

Great, but now we need to add the quotation marks and leading space to our regex, so that we can remove/replace them when performing the substitution for each matched line. Adding this punctuation to the regex, gives us:

```
\s"([A-Z][a-z]+) ([a-z]+)"
```

Note, that we don't need to reuse the punctuation during replacement, so we haven't wrapped them in `()` parentheses. Now we can define our replacement string to add underscores before and in between the genus and species names:

```
_\1_\2
```

Using this pair of regex and replacement string should convert the headers from the FASTA snippet above:

```
>GX3597KLM "Homo sapiens"
>GK9113FGH "Homo sapiens"
>GF7745PUP "Mus musculus"
>GD8332BAG "Homo sapiens"
>GK3091TFB "Mus musculus"
>GK3141YRK "Pan troglodytes"
```

to the desired format:

```
>GX3597KLM_Homo_sapiens
>GK9113FGH_Homo_sapiens
>GF7745PUP_Mus_musculus
>GD8332BAG_Homo_sapiens
>GK3091TFB_Mus_musculus
>GK3141YRK_Pan_troglodytes
```

> #### Exercise 5.1
> The file `example_protein_malformed.fasta` is missing the `>` character at the beginning of the headers. Use a capture group to add them.


> #### Exercise 5.2
> The file `file_paths.txt` contains file paths of image files. The files are organised by folders based on vacations, but the files themselves have cryptic names. You want the files to be prefixed by the vacation and move them into a shared folder. At the end the list should look like:
>
> ```
> /Users/Jane/shared/vacation-pics/France-2015-IMG-06650.jpg
> /Users/Jane/shared/vacation-pics/France-2015-IMG-06651.jpg
> ...
> /Users/Jane/shared/vacation-pics/France-2017-IMG-08449.jpg
> ...
> /Users/Jane/shared/vacation-pics/Greece-2016-IMG-07895.jpg
> ...```
>
> Use a capture group to transform the file paths accordingly.


