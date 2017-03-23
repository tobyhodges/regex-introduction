# 1. Introduction
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

## How can I get the files to use in the exercises?

Download a ZIP of all of the exercise files [here](http://bit.ly/2nqtWc4).
