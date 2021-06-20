import types from "./types";
import { handleActions } from "redux-actions";
import { initialStateModel } from "../../../utils/Utilities";

const initialState = {
  createJob: {
    ...initialStateModel,
  },

  getAllMeetings: {
    ...initialStateModel,
  },

  getMeetingsStatus: {
    ...initialStateModel,
  }
};

// Reducers from redux-actions
export default handleActions(
  {
    
    [types.RESET_ALL_MEETINGS]: (state, { payload }) => ({
      ...state,
      getAllMeetings: {
        ...initialStateModel,
      },
    }),
    // -------------------------------------

    [types.CREATE_JOB]: (state, { payload }) => ({
      ...state,
      createJob: {
        ...state.createJob,
        loading: true,
        pending: true,
      },
    }),
    [types.CREATE_JOB_SUCCESS]: (state, { payload }) => ({
      ...state,
      createJob: {
        ...state.createJob,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.CREATE_JOB_FAIL]: (state, { payload }) => ({
      ...state,
      createJob: {
        ...state.createJob,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------

    [types.GET_ALL_MEETINGS]: (state, { payload }) => ({
      ...state,
      getAllMeetings: {
        ...state.getAllMeetings,
        loading: true,
        pending: true,
      },
    }),
    [types.GET_ALL_MEETINGS_SUCCESS]: (state, { payload }) => ({
      ...state,
      getAllMeetings: {
        ...state.getAllMeetings,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.GET_ALL_MEETINGS_FAIL]: (state, { payload }) => ({
      ...state,
      getAllMeetings: {
        ...state.getAllMeetings,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------

    [types.GET_MEETING_STATUS]: (state, { payload }) => ({
      ...state,
      getMeetingsStatus: {
        ...state.getMeetingsStatus,
        loading: true,
        pending: true,
      },
    }),
    [types.GET_MEETING_STATUS_SUCCESS]: (state, { payload }) => ({
      ...state,
      getMeetingsStatus: {
        ...state.getMeetingsStatus,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.GET_MEETING_STATUS_FAIL]: (state, { payload }) => ({
      ...state,
      getMeetingsStatus: {
        ...state.getMeetingsStatus,
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
