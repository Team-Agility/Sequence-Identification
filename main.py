import glob
import os
import json
import re

# Constants
DATASET_OUT_DIR = 'dataset'

class Meeting:
  def __init__(self, meeting_id):
    self.meeting_id = meeting_id
    self.meeting_dir = f'{DATASET_OUT_DIR}/{self.meeting_id}'
    self.transcript = []
    print('\n')

  """
    Get Meeting Words

    :return: Meeting words dict
  """
  def get_transcript(self):
    print(f'{self.meeting_id}: Getting Transcript')
    if len(self.transcript) == 0:
      with open(f'{self.meeting_dir}/words_segmentation.json') as transcript_json:
        self.transcript = json.load(transcript_json)
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

    for transcript in self.transcript:
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
  meeting.get_transcript()
  meeting.preprocess()
  print(meeting.get_transcript())
  break


