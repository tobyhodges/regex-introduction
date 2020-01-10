> #### Exercise 2.1
> Find every instance of a histone deacetylase (HDAC) in the file, based on the gene name.  
Are there any potential problems with your search? 
Think about how you might make your search as specific as possible, to avoid spurious matches.

> #### Exercise 2.2
> a) In total, how many lines mention HDAC 1-5 in `example.gff`?  
> b) Which of the following expressions could you use to match any four-letter word 
>    beginning with an uppercase letter, followed by two vowels, and ending with 'd'?  
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
> c) Try playing around with the character ranges that you have learned above. 
>    What does `[A-z]` evauluate to? What about `[a-Z]`? 
>    Can you create a range that covers all letter and number characters?

> #### Exercise 2.3
> Use an inverted set to only match the human autosomes (chr1-22), i.e. filtering out 
> chromosomes chrX, chrY and chrM. 
> How many records with autosomes can you find in file `example.gff`?
