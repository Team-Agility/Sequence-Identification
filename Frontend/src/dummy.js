export const dummySteps = {
    "completed": true,
    "status": "Completed",
    "total_steps": 5,
    "completed_steps": 5,
    "all_steps": ["Input", "Word Graph Generate", "Topic Extraction", "Sequence Identification", "Output"],
    "steps": [
        {
            "type": "transcrpt",
            "step": "Input",
            "data": [
                {
                    "content": "Hi",
                    "end_time": 77.74,
                    "is_punction": false,
                    "speaker_id": "A",
                    "start_time": 77.44
                },
                {
                    "content": ",",
                    "end_time": 77.74,
                    "is_punction": true,
                    "speaker_id": "A",
                    "start_time": 77.74
                },
                {
                    "content": "I'm",
                    "end_time": 78.16,
                    "is_punction": false,
                    "speaker_id": "A",
                    "start_time": 77.74
                }
            ]
        },
        {
            "type": "image",
            "step": "Word Graph Generate",
            "data": "https://concisesoftware.com/wp-content/uploads/2019/05/Concise-Software-Scrum-meeting.jpg"
        },
        {
            "type": "string_list",
            "step": "Topic Extraction",
            "data": ['remote control', 'design', 'production cost', 'favourite animal']
        },
        {
            "type": "sequence",
            "step": "Sequence Identification",
            "data": [{
                "title": "remote control",
                "acts": ["Okay", "Um well this is the kick-off meeting for our our project. Um and um this is just what we're gonna be doing over the next twenty five minutes. Um so first of all, just to kind of make sure that we all know each other, I'm Laura and I'm the project manager. Do you want to introduce yourself again?"]
            },
            {
                "title": "xyz",
                "acts": ["Okay", "Um well this is the kick-off meeting for our our project. Um and um this is just what we're gonna be doing over the next twenty five minutes. Um so first of all, just to kind of make sure that we all know each other, I'm Laura and I'm the project manager. Do you want to introduce yourself again?"]
            }
            ]    
        },
        {
            "type": "sequence",
            "step": "Output",
            "data": [{
                "title": "remote control",
                "acts": ["Okay", "Um well this is the kick-off meeting for our our project. Um and um this is just what we're gonna be doing over the next twenty five minutes. Um so first of all, just to kind of make sure that we all know each other, I'm Laura and I'm the project manager. Do you want to introduce yourself again?"]
            },
            {
                "title": "xyz",
                "acts": ["Okay", "Um well this is the kick-off meeting for our our project. Um and um this is just what we're gonna be doing over the next twenty five minutes. Um so first of all, just to kind of make sure that we all know each other, I'm Laura and I'm the project manager. Do you want to introduce yourself again?"]
            }
            ]    
        }
    ]
  }
