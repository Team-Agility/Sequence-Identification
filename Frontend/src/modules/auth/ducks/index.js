/* INDEX FILE
It exports as default the reducer function of the duck.
It exports as named export the selectors and the operations.
Optionally it exports the actions and types if they are needed in other ducks.
*/

import reducers from "./reducers";

import authService from "./service";
import authTypes from "./types";
import authActions from "./actions";

export { authService, authActions, authTypes };

export default reducers;
