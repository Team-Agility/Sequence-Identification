
def cluster(transcript, filtered_transcript, topics, synonyms):
  print('Clustering...')
  clusters = {}
  topic_act_idx = {}
  for topic in topics:
    clusters[topic] = []
    topic_act_idx[topic] = []

  for act in filtered_transcript:
    idx = act['idx']
    segment = act['segment']

    for word in segment:
      for topic in topics:
        for keyword in topic.split(' '):
          if word == keyword or (word in synonyms and synonyms[word] == keyword):
            if idx not in topic_act_idx[topic]:
              clusters[topic].append(transcript[idx])
              topic_act_idx[topic].append(idx)

  return clusters