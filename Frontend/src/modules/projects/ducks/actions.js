// Actions
import { createAction } from "redux-actions";
import types from "./types";

export default {
  createJob: createAction(types.CREATE_JOB),
  createJobSuccess: createAction(types.CREATE_JOB_SUCCESS),
  createJobFail: createAction(types.CREATE_JOB_FAIL),

  getAllMeetings: createAction(types.GET_ALL_MEETINGS),
  getAllMeetingsSuccess: createAction(types.GET_ALL_MEETINGS_SUCCESS),
  getAllMeetingsFail: createAction(types.GET_ALL_MEETINGS_FAIL),

  getMeetingStatus: createAction(types.GET_MEETING_STATUS),
  getMeetingStatusSuccess: createAction(types.GET_MEETING_STATUS_SUCCESS),
  getMeetingStatusFail: createAction(types.GET_MEETING_STATUS_FAIL)
};
