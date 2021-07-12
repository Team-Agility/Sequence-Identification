import glob
import os
import json
import re
import nltk
from topicGraph import topicGraph
import clustering
from pathlib import Path

lemma = nltk.wordnet.WordNetLemmatizer()

# Constants
DATASET_OUT_DIR = 'dataset'
N_GRAM_NO = 2 # BIGRAM

class Meeting:
  def __init__(self, meeting_id):
    self.meeting_id = meeting_id
    self.meeting_dir = f'{DATASET_OUT_DIR}/{self.meeting_id}'
    self.filtered_transcript = []
    self.transcript = []
    self.load_transcript()
    self.topics = []
    self.clusters = {}
    self.word_count = {}
    self.meeting_end_time = 0.00
    self.nxGraph = None

    self.topicGraph = topicGraph()
    print('\n')

  """
    Load Transcript
  """
  def load_transcript(self):
    with open(f'{self.meeting_dir}/words_segmentation.json') as transcript_json:
      self.filtered_transcript = json.load(transcript_json)
    
  """
    Get Meeting Transcript

    :return: Meeting Transcript dict
  """
  def get_transcript(self):
    print(f'{self.meeting_id}: Getting Transcript')
    return self.filtered_transcript
      
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
    for idx, transcript in enumerate(self.filtered_transcript):
      self.transcript.append(transcript.copy())
      self.meeting_end_time = max(self.meeting_end_time, transcript['end_time'])

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
          transcript['idx'] = idx
          fillered_transcript.append(transcript)
          for word in transcript['segment']:
            if word not in self.word_count:
              self.word_count[word] = 1
            else:
              self.word_count[word] += 1

    self.filtered_transcript = fillered_transcript
    self.transcript = sorted(self.transcript, key=lambda k: k['start_time'])
  
  """
    Create Topic Extraction Graph

    :return: None
  """
  def createGraph(self):
    print(f'{self.meeting_id}: Creating Topic Extraction Graph...')

    for transcript in self.filtered_transcript:
      for idx, word in enumerate(transcript['segment']):
        if N_GRAM_NO >= 2 and idx >= 1:
          self.topicGraph.incrementEdgeWeight(transcript['segment'][idx-1], word, 1)        
        if N_GRAM_NO >= 3 and idx >= 2:
          self.topicGraph.incrementEdgeWeight(transcript['segment'][idx-2], word, 0.3)

    # self.topicGraph.printGraph()
    # print(self.topicGraph.getNodes())
    print(self.topicGraph.getNodes(30))
    self.topicGraph.clusterSimiilarWords(30)
    topics = list(self.topicGraph.getNodes(10).keys())
    # print(topics)
    self.topics = []
    # print(self.word_count)
    for topic in topics:
      if topic not in self.word_count:
        self.topics.append(topic)
        print('skipped', topic)
        continue
      max_topic = topic
      max_word_count = self.word_count[topic]
      for synonym in self.topicGraph.synonyms:
        if self.topicGraph.synonyms[synonym] == topic:
          if synonym in self.word_count and max_word_count < self.word_count[synonym]:
            max_topic = synonym
            max_word_count = self.word_count[synonym]

      if topic != max_topic:
        self.topicGraph.synonyms[topic] = max_topic
        for synonym in self.topicGraph.synonyms:
          if self.topicGraph.synonyms[synonym] == topic:
            self.topicGraph.synonyms[synonym] = max_topic

      self.topics.append(max_topic)
    print('Topics', self.topics)
    return self.topics, self.topicGraph.nxGraph

  def findClusters(self):
    self.clusters = clustering.cluster(self.transcript, self.filtered_transcript, self.topics, self.topicGraph.synonyms, self.meeting_end_time)
    # print(self.clusters)

  # def getAccuracy(self):
  #   TP = TN = FP = FN = 0
  #   for i, idx in emularate(self.original_clusters):
  #     if wordUtils.getSynonyms(self.clusters, i) > 0.75:
  #       TP += 1
  #     else:
  #       TN += 1

  #   for i, idx in emularate(self.clusters):
  #     if wordUtils.getSynonyms(self.original_clusters, i) > 0.75:
  #       FN += 1
  #     else:
  #       FP += 1

  #   retunr TP, TN, FP, FN


  def findSequences(self):
    print('finding sequence')
    sequences = {}
    for cluster in self.clusters:
      if cluster['topic'] not in sequences:
        sequences[cluster['topic']] = []
      cluster_start_time = cluster['start_time']
      cluster_end_time = cluster['end_time']
      for act in self.transcript:
        if act['start_time'] >= cluster_start_time and act['end_time'] <= cluster_end_time:
          sequences[cluster['topic']].append(act)

    
    Path(f'output/{self.meeting_id}').mkdir(parents=True, exist_ok=True)
    with open(f'output/{self.meeting_id}/sequences.json', 'w', encoding='utf-8') as f:
      json.dump(sequences, f, ensure_ascii=False, indent=4)

    res = []
    for topic in sequences.keys():
      res.append({
        'title': topic,
        'acts': [act['segment'] for act in sequences[topic]]
      })
    return res

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

# meeting_ids = GetAllMeetingIDs()
# for meeting_id in meeting_ids:
#   meeting = Meeting(meeting_id)
#   meeting.preprocess()
#   meeting.createGraph()
#   meeting.findClusters()
#   meeting.findSequences()
  
# TP = TN = FP = FN = 0  
# def accuracy():
#   meetings = GetAllMeetingIDs()
#   for meeting in meetings:
#     meeting = Meeting(meeting)
#     TP ,TN ,FP, FN = accumulate(meeting.getAccuracy())

# recall = TP / (TP + FN)
# precission = TP / (TP + FP)
# print('recall ', recall)
# print('precission ', precission)
# print('F1_messure ', 2 * precission * recall / (precission + recall))

  




