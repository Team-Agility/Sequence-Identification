const action_header = "auth/";

// Types
export default {
  LOGIN: action_header + "LOGIN",
  LOGIN_SUCCESS: action_header + "LOGIN_SUCCESS",
  LOGIN_FAIL: action_header + "LOGIN_FAIL",

  REGISTER: action_header + "REGISTER",
  REGISTER_SUCCESS: action_header + "REGISTER_SUCCESS",
  REGISTER_FAIL: action_header + "REGISTER_FAIL",

  FORGOT_PASSWORD: action_header + "FORGOT_PASSWORD",
  FORGOT_PASSWORD_SUCCESS: action_header + "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_FAIL: action_header + "FORGOT_PASSWORD_FAIL",

  RESET_PASSWORD: action_header + "RESET_PASSWORD",
  RESET_PASSWORD_SUCCESS: action_header + "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_FAIL: action_header + "RESET_PASSWORD_FAIL"
};
