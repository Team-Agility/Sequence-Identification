
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

  timebased_clusters = []
  for topic in clusters:
    for act in clusters[topic]:
      timebased_clusters.append({
        'start_time': act['start_time'],
        'end_time': act['end_time'],
        'topic': topic
      })
  timebased_clusters = sorted(timebased_clusters, key=lambda k: k['start_time'])

  simplified_timebased_clusters = []
  for idx, cluster in enumerate(timebased_clusters):
    if idx == 0:
      if cluster['topic'] == timebased_clusters[idx + 1]['topic']:
        simplified_timebased_clusters.append(cluster)
    elif idx == len(timebased_clusters) - 1:
      if cluster['topic'] == simplified_timebased_clusters[-1]['topic']:
        simplified_timebased_clusters.append(cluster)
    elif cluster['topic'] == timebased_clusters[idx + 1]['topic'] or (len(simplified_timebased_clusters) > 0 and cluster['topic'] == simplified_timebased_clusters[-1]['topic']):
        simplified_timebased_clusters.append(cluster)

  # print(simplified_timebased_clusters)
  final_clusters = []
  prev_cluster = simplified_timebased_clusters[0]['topic']
  start_time = 0.00
  for idx, cluster in enumerate(simplified_timebased_clusters):
    if len(simplified_timebased_clusters) - 1 == idx:
       final_clusters.append({
        'start_time': start_time,
        'end_time': cluster['end_time'],
        'topic': ' '.join(prev_cluster.split(' ')[0:min(len(prev_cluster.split(' ')), 3)])
      })
    elif cluster['topic'] != prev_cluster:
      final_clusters.append({
        'start_time': start_time,
        'end_time': cluster['start_time'],
        'topic': ' '.join(prev_cluster.split(' ')[0:min(len(prev_cluster.split(' ')), 3)])
      })
      start_time = cluster['start_time']
    prev_cluster = cluster['topic']

  return final_clusters