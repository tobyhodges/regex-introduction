#! /usr/bin/env python

import random

for d in [
  'France-2015',
  'France-2017',
  'Greece-2016'
]:
    n = random.randint(10, 20)
    start = random.randint(1,10000)
    for i in xrange(start, start + n):
        print "/Users/Jane/Pictures/{}/IMG-{}.jpg".format(d, str(i).zfill(5))
