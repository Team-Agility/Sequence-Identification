// Actions
import { createAction } from "redux-actions";
import types from "./types";

export default {
  getAllProjects: createAction(types.GET_ALL_PROJECTS),
  getAllProjectsSuccess: createAction(types.GET_ALL_PROJECTS_SUCCESS),
  getAllProjectsFail: createAction(types.GET_ALL_PROJECTS_FAIL),

  createProject: createAction(types.CREATE_PROJECT),
  createProjectSuccess: createAction(types.CREATE_PROJECT_SUCCESS),
  createProjectFail: createAction(types.CREATE_PROJECT_FAIL),

  getProject: createAction(types.GET_PROJECT),
  getProjectSuccess: createAction(types.GET_PROJECT_SUCCESS),
  getProjectFail: createAction(types.GET_PROJECT_FAIL),

  updateProject: createAction(types.UPDATE_PROJECT),
  updateProjectSuccess: createAction(types.UPDATE_PROJECT_SUCCESS),
  updateProjectFail: createAction(types.UPDATE_PROJECT_FAIL),

  deleteProject: createAction(types.DELETE_PROJECT),
  deleteProjectSuccess: createAction(types.DELETE_PROJECT_SUCCESS),
  deleteProjectFail: createAction(types.DELETE_PROJECT_FAIL),
};
