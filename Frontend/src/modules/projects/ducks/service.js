import { createLogic } from "redux-logic";

import actions from "./actions";
import types from "./types";
import endPoints from "../../../utils/EndPoints";
import * as API from "../../../utils/HTTPClient";
import { NotificationManager } from "react-notifications";
import { reset } from "redux-form";
import history from "../../../_helpers/history";

const createJob = createLogic({
  type: types.CREATE_JOB,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running createJob Service");
    HTTPClient.Post(endPoints.create_job, action.payload.createJobDto)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.createJobSuccess(data));
        NotificationManager.success("successfull created job", "Success");
        dispatch(reset("Inputs"));
        dispatch(actions.resetAllMeetings());
        setTimeout(function(){ 
          history.push("/output");
        }, 3000);

      })
      .catch((err) => {
        console.log("createJob -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        NotificationManager.error("Fail created job", "Fail");

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

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }

    console.log("Running getAllMeetings Service");

    HTTPClient.Get(endPoints.get_all_meetings)
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

  process({ MockHTTPClient, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running getMeetingStatus Service");
    HTTPClient.Get(endPoints.get_meeting_status+`${action.payload.id}`)
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
