const action_header = "project/";

// Types
export default {
  GET_ALL_PROJECTS: action_header + "GET_ALL_PROJECTS",
  GET_ALL_PROJECTS_SUCCESS: action_header + "GET_ALL_PROJECTS_SUCCESS",
  GET_ALL_PROJECTS_FAIL: action_header + "GET_ALL_PROJECTS_FAIL",

  CREATE_PROJECT: action_header + "CREATE_PROJECT",
  CREATE_PROJECT_SUCCESS: action_header + "CREATE_PROJECT_SUCCESS",
  CREATE_PROJECT_FAIL: action_header + "CREATE_PROJECT_FAIL",

  GET_PROJECT: action_header + "GET_PROJECT",
  GET_PROJECT_SUCCESS: action_header + "GET_PROJECT_SUCCESS",
  GET_PROJECT_FAIL: action_header + "GET_PROJECT_FAIL",

  UPDATE_PROJECT: action_header + "UPDATE_PROJECT",
  UPDATE_PROJECT_SUCCESS: action_header + "UPDATE_PROJECT_SUCCESS",
  UPDATE_PROJECT_FAIL: action_header + "UPDATE_PROJECT_FAIL",

  DELETE_PROJECT: action_header + "DELETE_PROJECT",
  DELETE_PROJECT_SUCCESS: action_header + "DELETE_PROJECT_SUCCESS",
  DELETE_PROJECT_FAIL: action_header + "DELETE_PROJECT_FAIL",
};
