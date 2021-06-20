import { createLogic } from "redux-logic";

import actions from "./actions";
import types from "./types";
import endPoints from "../../../utils/EndPoints";
import * as API from "../../../utils/HTTPClient";

const login = createLogic({
  type: types.LOGIN,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running login Service");
    HTTPClient.Get(endPoints.GetAllMembers)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.loginSuccess(data));
      })
      .catch((err) => {
        console.log("login -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.loginFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

const register = createLogic({
  type: types.REGISTER,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running register Service");
    HTTPClient.Get(endPoints.GetAllMembers)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.registerSuccess(data));
      })
      .catch((err) => {
        console.log("register -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.registerFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

const forgotPassword = createLogic({
  type: types.FORGOT_PASSWORD,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running forgotPassword Service");
    HTTPClient.Get(endPoints.GetAllMembers)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.forgotPasswordSuccess(data));
      })
      .catch((err) => {
        console.log("forgotPassword -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.forgotPasswordFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

const resetPassword = createLogic({
  type: types.RESET_PASSWORD,
  latest: true,
  debounce: 1000,

  process({ MockHTTPClient }, dispatch, done) {
    let HTTPClient;
    if (MockHTTPClient) {
      HTTPClient = MockHTTPClient;
    } else {
      HTTPClient = API;
    }
    console.log("Running resetPassword Service");
    HTTPClient.Get(endPoints.Get_all_events)
      .then((resp) => resp.data)
      .then((data) => {
        dispatch(actions.resetPasswordSuccess(data));
      })
      .catch((err) => {
        console.log("resetPassword -> err", err);
        var errorMessage = "Failed to get regions";
        if (err && err.code === "ECONNABORTED") {
          errorMessage = "Please check your internet connection.";
        }
        dispatch(
          actions.resetPasswordFail({
            title: "Error!",
            message: errorMessage,
          })
        );
      })
      .then(() => done());
  },
});

export default [login, register, forgotPassword, resetPassword];
