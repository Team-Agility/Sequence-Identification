// Actions
import { createAction } from "redux-actions";
import types from "./types";

export default {
  login: createAction(types.LOGIN),
  loginSuccess: createAction(types.LOGIN_SUCCESS),
  loginFail: createAction(types.LOGIN_FAIL),

  register: createAction(types.REGISTER),
  registerSuccess: createAction(types.REGISTER_SUCCESS),
  registerFail: createAction(types.REGISTER_FAIL),

  forgotPassword: createAction(types.FORGOT_PASSWORD),
  forgotPasswordSuccess: createAction(types.FORGOT_PASSWORD_SUCCESS),
  forgotPasswordFail: createAction(types.FORGOT_PASSWORD_FAIL),

  resetPassword: createAction(types.RESET_PASSWORD),
  resetPasswordSuccess: createAction(types.RESET_PASSWORD_SUCCESS),
  resetPasswordFail: createAction(types.RESET_PASSWORD_FAIL),
};
