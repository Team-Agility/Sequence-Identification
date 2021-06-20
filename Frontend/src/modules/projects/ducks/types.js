const action_header = "project/";

// Types
export default {
  CREATE_JOB: action_header + "CREATE_JOB",
  CREATE_JOB_SUCCESS: action_header + "CREATE_JOB_SUCCESS",
  CREATE_JOB_FAIL: action_header + "CREATE_JOB_FAIL",

  GET_ALL_MEETINGS: action_header + "GET_ALL_MEETINGS",
  GET_ALL_MEETINGS_SUCCESS: action_header + "GET_ALL_MEETINGS_SUCCESS",
  GET_ALL_MEETINGS_FAIL: action_header + "GET_ALL_MEETINGS_FAIL",

  GET_MEETING_STATUS: action_header + "GET_MEETING_STATUS",
  GET_MEETING_STATUS_SUCCESS: action_header + "GET_MEETING_STATUS_SUCCESS",
  GET_MEETING_STATUS_FAIL: action_header + "GET_MEETING_STATUS_FAIL",

  RESET_ALL_MEETINGS:action_header + "RESET_ALL_MEETINGS"
};
