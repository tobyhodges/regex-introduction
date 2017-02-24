# 5. Capture Groups and References
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


