import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr
import datetime

dynamodb = None
if not dynamodb:
  dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('scrum-meeting-minutes')

def put(item):
  # print('Adding Data to DB', item)
  response = table.put_item( Item=item )
  return response

def get(pk, sk):
  # print('Adding Data to DB', item)
  try:
    response = table.get_item( Key={'pk': pk, 'sk': sk} )
  except ClientError as e:
      print(e.response['Error']['Message'])
  else:
      return response['Item']

def getAllMeetingIDs():
  response = table.query(
    KeyConditionExpression=Key('pk').eq('#SEQUENCE'),
    ProjectionExpression="sk, updated_at, steps, completed_steps"
  )

  response['Items'].sort(key=lambda x: x['updated_at'], reverse=True)
  res = []
  for job in response['Items']:
    res.append({
      'id': job['sk'],
      'updated_at': job['updated_at'],
      'status': 'Completed' if job['steps'] == job['completed_steps'] else 'Processing'
    })
  return res

def getData(meeting_id):
  return get('#SEQUENCE', meeting_id)

def updateStatus(meeting_id, all_steps, steps, completed_steps, data):
  put({
    'pk': '#SEQUENCE',
    'sk': meeting_id,
    'steps': steps,
    'all_steps': all_steps,
    'completed_steps': completed_steps,
    'data': json.dumps(data),
    'updated_at': datetime.datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
  })