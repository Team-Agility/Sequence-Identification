import boto3

s3 = boto3.resource('s3')

DATASET_OUT_DIR = 'dataset'

def S3Upload(meeting_id, filename):
  s3.meta.client.upload_file(f'{DATASET_OUT_DIR}/{meeting_id}/{filename}', 'scrum-meeting-minutes', f'{meeting_id}/{filename}')
  return f'https://scrum-meeting-minutes.s3.ap-southeast-1.amazonaws.com/{meeting_id}/{filename}'