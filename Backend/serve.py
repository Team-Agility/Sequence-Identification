from utils.thread import startTraining
from utils.db import getAllMeetingIDs, getData
from utils.requests import ClientError, ResponseData, Success, convertToObj
from flask import Flask, request
from flask_swagger import swagger
import uuid
import json
import os
import decimal

class JSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, decimal.Decimal): return float(obj)

DATASET_OUT_DIR = 'dataset'
STEPS = ["Input", "Word Graph Generate", "Topic Extraction", "Sequence Identification", "Output"]

app = Flask(__name__)
app.json_encoder = JSONEncoder

@app.route('/<id>', methods=['GET'])
def getResult(id):
  data = getData(id)
  return ResponseData(convertToObj(data['pk'], data['completed_steps'], data['all_steps'], json.loads(data['data'])))

@app.route('/', methods=['GET'])
def getAllMeetings():
    return ResponseData(getAllMeetingIDs())

@app.route('/', methods=['POST'])
def createNewJob():
  id = str(uuid.uuid4())
  print(f'Adding New Meeting {id}')

  data = request.json

  if 'transcript' not in data:
    return ClientError('Paramater `transcript` Required')

  dataset_path = f'{DATASET_OUT_DIR}/{id}'
  if not os.path.exists(dataset_path):
    os.makedirs(dataset_path)
  
  with open(f'{dataset_path}/words_segmentation.json', 'w') as f:
    f.write(json.dumps(data['transcript'], indent=4, sort_keys=True))  

  startTraining(id, STEPS, data['transcript'], dataset_path)

  return Success('Success')

@app.route("/spec")
def spec():
    return jsonify(swagger(app))

if __name__ == '__main__':
   app.run(host='0.0.0.0')