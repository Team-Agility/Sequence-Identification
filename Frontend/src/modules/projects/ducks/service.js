import { createLogic } from "redux-logic";

import actions from "./actions";
import types from "./types";
import endPoints from "../../../utils/EndPoints";
import * as API from "../../../utils/HTTPClient";

const createJob = createLogic({
  type: types.CREATE_JOB,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running createJob Service");
    HTTPClient.Get(endPoints.createJob)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.createJobSuccess(data));
      })
      .catch((err) => {
        console.log("createJob -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.createJobFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

const getAllMeetings = createLogic({
  type: types.GET_ALL_MEETINGS,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }

    console.log("Running getAllMeetings Service");
    console.log("paylaod : ", action.payload);

    HTTPClient.Post(endPoints.project, action.payload.projectDto)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.getAllMeetingsSuccess(data));
      })
      .catch((err) => {
        console.log("getAllMeetings -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.getAllMeetingsFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});


const getMeetingStatus = createLogic({
  type: types.GET_MEETING_STATUS,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running getMeetingStatus Service");
    HTTPClient.Get(endPoints.GetAllProjects)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.getMeetingStatusSuccess(data));
      })
      .catch((err) => {
        console.log("getMeetingStatus -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.getMeetingStatusFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

export default [createJob, getAllMeetings, getMeetingStatus];
