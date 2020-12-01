import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";

import auth from "./auth";
import survey from "./survey";
import audience from "./audience";

export default history => combineReducers({
  auth,
  survey,
  audience,
  router: connectRouter(history),
});
