import types from "./types";
import { handleActions } from "redux-actions";
import { initialStateModel } from "../../../utils/Utilities";

const initialState = {
  login: {
    ...initialStateModel,
  },

  register: {
    ...initialStateModel,
  },

  forgotPassword: {
    ...initialStateModel,
  },

  resetPassword: {
    ...initialStateModel,
  }
};

// Reducers from redux-actions
export default handleActions(
  {
    [types.LOGIN]: (state, { payload }) => ({
      ...state,
      login: {
        ...state.login,
        loading: true,
        pending: true,
      },
    }),
    [types.LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      login: {
        ...state.login,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.LOGIN_FAIL]: (state, { payload }) => ({
      ...state,
      login: {
        ...state.login,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------------------------

    [types.REGISTER]: (state, { payload }) => ({
      ...state,
      register: {
        ...state.register,
        loading: true,
        pending: true,
      },
    }),
    [types.REGISTER_SUCCESS]: (state, { payload }) => ({
      ...state,
      register: {
        ...state.register,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.REGISTER_FAIL]: (state, { payload }) => ({
      ...state,
      register: {
        ...state.register,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------------------------

    [types.FORGOT_PASSWORD]: (state, { payload }) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        loading: true,
        pending: true,
      },
    }),
    [types.FORGOT_PASSWORD_SUCCESS]: (state, { payload }) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        loading: false,
        pending: false,
        data: payload,
      },
    }),
    [types.FORGOT_PASSWORD_FAIL]: (state, { payload }) => ({
      ...state,
      forgotPassword: {
        ...state.forgotPassword,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------------------------

    [types.RESET_PASSWORD]: (state, { payload }) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        loading: true,
        pending: true,
      },
    }),
    [types.RESET_PASSWORD_SUCCESS]: (state, { payload }) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        loading: false,
        pending: false,
        data: payload,
      },
    }),

    [types.RESET_PASSWORD_FAILED]: (state, { payload }) => ({
      ...state,
      resetPassword: {
        ...state.resetPassword,
        loading: false,
        pending: false,
        hasError: true,
        error: { payload },
      },
    }),
    // -------------------------------------------------------

  },
  initialState
);
