# Introduction to Regular Expressions

## Materials for an entry-level regex course

#### Authors

Markus Fritz, Toby Hodges, and Mike Smith  
Bio-IT Community, EMBL

#### Introduction

Do you often work with lots of data files on the computer? Are you often trying
to spot particular files or lines of text in them that are important for you?

If so, then using regular expressions could save you a lot of time and frustration!

Regular expressions (regex/REs) are a method for describing patterns of characters
that you want to match in a body of text. A knowledge of regular expressions can
be extremely helpful in computational biology and when combined with text editors
and common tools (`grep`, `sed`, `awk`, etc) used in command line computing.

These course materials are designed to give an introduction to using regular
regular expressions. Working through the materials, you will learn how to
quickly find and replace text in large files, controlling the types and numbers
of characters matched, handling repeats, keeping certain parts of a matched 
pattern during replacement, and constructing sets of different options to be
matched.

The course does _not_ provide a comprehensive overview of the regex syntax
or engine. Instead, they reflect the vast majority of use cases that the
authors encounter. The background of the authors is represented in many of the
examples chosen, which often focus on biological contexts and file formats.

For a comprehensive overview of regular expressions, we highly recommend the
excellent [regular-expressions.info](http://www.regular-expressions.info).

#### Contents

1. [Introduction](./1-introduction.md)
2. [Regex Fundamentals](./2-regex-fundamentals.md)
3. [Tokens & Wildcards](./3-tokens-and-wildcards.md)
4. [Repeats](./4-repeats.md)
5. [Capture Groups](./5-capture-groups.md)
6. [Alternative Matching](./6-alternative-matching.md)
7. [Links & Recommended Reading](./7-links.md)
8. [Solutions](./8-solutions.md)

#### History

These materials have been developed from a short workshop originally hosted by
the authors at EMBL in January 2016. They will be first used in their more developed 
new state at a half-day course taking place at EMBL on 23rd March 2017.