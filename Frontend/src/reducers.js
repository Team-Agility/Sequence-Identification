// Reducers: combine all reducers of the app
import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";

import projects from "./modules/projects/ducks";
import auth from "./modules/auth/ducks";


export default combineReducers({
  form: reduxFormReducer,
  Auth:auth,
  Projects: projects,
});
