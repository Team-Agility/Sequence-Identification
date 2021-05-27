from itertools import chain
from nltk.corpus import wordnet

def getSynonyms(word):
  synonyms = wordnet.synsets(word)
  lemmas = set(chain.from_iterable([word.lemma_names() for word in synonyms]))
  return list(lemmas)

def isHypernym(word1, word2):
  w1 = wordnet.synsets(word1)
  w2 = wordnet.synsets(word2)
  if len(w1) == 0 or len(w2) == 0:
    return False
  if wordnet.wup_similarity(w1[0], w2[0]) < 0.85:
    return False
  print(word1, word2, wordnet.wup_similarity(w1[0], w2[0]))
  return True if (len(w1[0].lowest_common_hypernyms(w2[0], use_min_depth=True)) > 0) else False