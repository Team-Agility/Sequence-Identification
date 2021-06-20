import { createLogic } from "redux-logic";

import actions from "./actions";
import types from "./types";
import endPoints from "../../../utils/EndPoints";
import * as API from "../../../utils/HTTPClient";

const getAllProjects = createLogic({
  type: types.GET_ALL_PROJECTS,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running getAllProjects Service");
    HTTPClient.Get(endPoints.GetAllProjects)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.getAllProjectsSuccess(data));
      })
      .catch((err) => {
        console.log("getAllProjects -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.getAllProjectsFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

const createProject = createLogic({
  type: types.CREATE_PROJECT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient, action }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }

    console.log("Running createProject Service");
    console.log("paylaod : ", action.payload);

    HTTPClient.Post(endPoints.project, action.payload.projectDto)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.createProjectSuccess(data));
      })
      .catch((err) => {
        console.log("createProject -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.createProjectFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});


const getProject = createLogic({
  type: types.GET_PROJECT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running getProject Service");
    HTTPClient.Get(endPoints.GetAllProjects)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.getProjectSuccess(data));
      })
      .catch((err) => {
        console.log("getProject -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.getProjectFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

const updateProject = createLogic({
  type: types.UPDATE_PROJECT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running updateProject Service");
    HTTPClient.Get(endPoints.GetAllProjects)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.updateProjectSuccess(data));
      })
      .catch((err) => {
        console.log("updateProject -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.updateProjectFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

const deleteProject = createLogic({
  type: types.DELETE_PROJECT,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running deleteProject Service");
    HTTPClient.Get(endPoints.GetAllProjects)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.deleteProjectSuccess(data));
      })
      .catch((err) => {
        console.log("deleteProject -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.deleteProjectFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

export default [getAllProjects, createProject, getProject, updateProject, deleteProject];
