import glob
import os
import json
import re
import nltk
from keywordGraph import keywordGraph

lemma = nltk.wordnet.WordNetLemmatizer()

# Constants
DATASET_OUT_DIR = 'dataset'
N_GRAM_NO = 2 # BIGRAM

class Meeting:
  def __init__(self, meeting_id):
    self.meeting_id = meeting_id
    self.meeting_dir = f'{DATASET_OUT_DIR}/{self.meeting_id}'
    self.transcript = []
    self.load_transcript()

    self.keywordGraph = keywordGraph()
    print('\n')

  """
    Load Transcript
  """
  def load_transcript(self):
    with open(f'{self.meeting_dir}/words_segmentation.json') as transcript_json:
      self.transcript = json.load(transcript_json)
    
  """
    Get Meeting Transcript

    :return: Meeting Transcript dict
  """
  def get_transcript(self):
    print(f'{self.meeting_id}: Getting Transcript')
    return self.transcript
      
  """
    Preprocess Transacript

    :return: None
  """
  def preprocess(self):
    print(f'{self.meeting_id}: Pre Processing...')
    
    with open('filters/filter_words.txt', 'r') as f:
      filler_words = [filler_word.strip().lower() for filler_word in set(f.read().splitlines())]
    with open('filters/stopwords.txt', 'r') as f:
        stopwords = [stopword.strip().lower() for stopword in set(f.read().splitlines())]

    fillered_transcript = []
    for transcript in self.transcript:
      # Remove Punctuation Marks
      for punctuationMark in ['.', ',', '?']:
        transcript['segment'] = transcript['segment'].replace(punctuationMark, '')

      # replace consecutive unigrams with a single instance
      transcript['segment'] = re.sub('\\b(\\w+)\\s+\\1\\b', '\\1', transcript['segment'])
      # same for bigrams
      transcript['segment'] = re.sub('(\\b.+?\\b)\\1\\b', '\\1', transcript['segment'])

      # remove filler words
      transcript['segment'] = ' ' + transcript['segment'] + ' '
      for filler_word in filler_words:
        transcript['segment'] = re.sub(' ' + filler_word + ' ', ' ', transcript['segment'])
        transcript['segment'] = re.sub(' ' + filler_word.capitalize() + ' ', ' ', transcript['segment'])

      # remove stopwords
      transcript['segment'] = ' ' + transcript['segment'] + ' '
      for stopword in stopwords:
        transcript['segment'] = re.sub(' ' + stopword + ' ', ' ', transcript['segment'])
        transcript['segment'] = re.sub(' ' + stopword.capitalize() + ' ', ' ', transcript['segment'])
        
      # strip extra white space
      transcript['segment'] = re.sub(' +', ' ', transcript['segment'])
      # strip leading and trailing white space
      transcript['segment'] = transcript['segment'].strip()

      # Tokernize DA
      transcript['segment'] = nltk.word_tokenize(transcript['segment'])

      # Lemmetize Words
      transcript['segment'] = [lemma.lemmatize(word) for word in transcript['segment']]

      # utterances that contain less than 3 nonstop words are pruned out
      if len(transcript['segment']) >= 3:
        pos_filtered_segment = []
        for word in transcript['segment']:
          if nltk.pos_tag([word])[0][1] in ['NN', 'NNS', 'NNP', 'NNPS', 'VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']:
            pos_filtered_segment.append(word)
        
        transcript['segment'] = pos_filtered_segment
        if len(pos_filtered_segment) > 0:
          fillered_transcript.append(transcript)

    self.transcript = fillered_transcript
  
  """
    Create Keyword Extraction Graph

    :return: None
  """
  def createGraph(self):
    print(f'{self.meeting_id}: Creating Keyword Extraction Graph...')

    for transcript in self.transcript:
      for idx, word in enumerate(transcript['segment']):
        if N_GRAM_NO >= 2 and idx >= 1:
          self.keywordGraph.incrementEdgeWeight(transcript['segment'][idx-1], word, 1)
    self.keywordGraph.printGraph()

"""
  Get All Dataset's Meeting IDs
  
  :return: String Array with Meeting IDs
"""
def GetAllMeetingIDs():
  files = [os.path.basename(folder_path) for folder_path in glob.glob(f'{DATASET_OUT_DIR}/*')]
  meetings = []
  for file in files:
    if '.' not in file and len(file) == 7:
      meetings.append(file)
  return meetings

meeting_ids = GetAllMeetingIDs()
for meeting_id in meeting_ids:
  meeting = Meeting(meeting_id)
  meeting.preprocess()
  meeting.createGraph()
  
      


