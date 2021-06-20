from flask import jsonify

def ClientError(message):
  res = {
      'success': False,
      'message': message
    }

  return jsonify(res), 400

def Success(message):
  res = {
      'success': True,
      'message': message
    }

  return jsonify(res), 200

def ResponseData(data, message = 'Request Success'):
  res = {
      'success': True,
      'message': message,
      'data': data
    }

  return jsonify(res), 200

def convertToObj(meeting_id, completed_steps, all_steps = [], steps = []):
  total_steps = len(all_steps)
  completed =  total_steps == completed_steps
  return {
    "meeting_id": meeting_id,
    "success": True,
    "completed": completed,
    "status": "Completed" if completed else "Processing",
    "total_steps": total_steps,
    "completed_steps": completed_steps,
    "all_steps": all_steps,
    "steps": steps
  }

def Response(meeting_id, completed_steps, all_steps = [], steps = []):
  res = convertToObj(meeting_id, completed_steps, all_steps, steps)

  return jsonify(res), 200