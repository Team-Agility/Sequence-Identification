import types from "./types";
import { handleActions } from "redux-actions";
import { initialStateModel } from "../../../utils/Utilities";

const initialState = {
  allProjects: {
    ...initialStateModel,
  },

  createProject: {
    ...initialStateModel,
  },

  getProject: {
    ...initialStateModel,
  },

  updateProject: {
    ...initialStateModel,
  },

  deleteProject: {
    ...initialStateModel,
  },
};

// Reducers from redux-actions
export default handleActions(
  {
    [types.GET_ALL_PROJECTS]: (state, { payload }) => ({
      ...state,
      allProjects: {
        ...state.allProjects,
        loading: true,
        pending: true,
      },
    }),
    [types.GET_ALL_PROJECTS_SUCCESS]: (state, { payload }) => ({
      ...state,
      allProjects: {
        ...state.allProjects,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.GET_ALL_PROJECTS_FAIL]: (state, { payload }) => ({
      ...state,
      allProjects: {
        ...state.allProjects,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------

    [types.CREATE_PROJECT]: (state, { payload }) => ({
      ...state,
      createProject: {
        ...state.createProject,
        loading: true,
        pending: true,
      },
    }),
    [types.CREATE_PROJECT_SUCCESS]: (state, { payload }) => ({
      ...state,
      createProject: {
        ...state.createProject,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.CREATE_PROJECT_FAIL]: (state, { payload }) => ({
      ...state,
      createProject: {
        ...state.createProject,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------

    [types.GET_PROJECT]: (state, { payload }) => ({
      ...state,
      getProject: {
        ...state.getProject,
        loading: true,
        pending: true,
      },
    }),
    [types.GET_PROJECT_SUCCESS]: (state, { payload }) => ({
      ...state,
      getProject: {
        ...state.getProject,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.GET_PROJECT_FAIL]: (state, { payload }) => ({
      ...state,
      getProject: {
        ...state.getProject,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------

    [types.UPDATE_PROJECT]: (state, { payload }) => ({
      ...state,
      updateProject: {
        ...state.updateProject,
        loading: true,
        pending: true,
      },
    }),
    [types.UPDATE_PROJECT_SUCCESS]: (state, { payload }) => ({
      ...state,
      updateProject: {
        ...state.updateProject,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.UPDATE_PROJECT_FAIL]: (state, { payload }) => ({
      ...state,
      updateProject: {
        ...state.updateProject,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------

    [types.DELETE_PROJECT]: (state, { payload }) => ({
      ...state,
      deleteProject: {
        ...state.deleteProject,
        loading: true,
        pending: true,
      },
    }),
    [types.DELETE_PROJECT_SUCCESS]: (state, { payload }) => ({
      ...state,
      deleteProject: {
        ...state.deleteProject,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.DELETE_PROJECT_FAIL]: (state, { payload }) => ({
      ...state,
      deleteProject: {
        ...state.deleteProject,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------
  },
  initialState
);
