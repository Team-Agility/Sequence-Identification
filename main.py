import glob
import os
import json

# Constants
DATASET_OUT_DIR = 'dataset'

class Meeting:
  def __init__(self, meeting_id):
    self.meeting_id = meeting_id
    self.meeting_dir = f'{DATASET_OUT_DIR}/{self.meeting_id}'

  """
    Get Meeting Words

    :return: Meeting words dict
  """
  def get_transcript(self):
    with open(f'{self.meeting_dir}/words_segmentation.json') as transcript_json:
      transcripts = json.load(transcript_json)
      return transcripts


  
"""
  Get All Dataset's Meeting IDs
  
  :return: Strring Array with Meeting IDs
"""
def GetAllMeetingIDs():
  return [ os.path.basename(folder_path) for folder_path in glob.glob(f'{DATASET_OUT_DIR}/*')]

meeting_ids = GetAllMeetingIDs()
for meeting_id in meeting_ids:
  meeting = Meeting(meeting_id)
  print(meeting.get_transcript())


