import {Record} from "immutable";
import actionTypes from "../constants/actionTypes";

const {
  AUTH_GET_ME,
  AUTH_POST_SIGNUP,
  AUTH_POST_LOGOUT,
} = actionTypes;

const InitialState = new Record({
  getMe: false,
  postSignup: false,
});

export default (
  state = new InitialState(),
  {
    type,
    value,
  },
) => {
  switch (type) {
    case AUTH_GET_ME: {
      return state.set("getMe", value);
    }
    case AUTH_POST_SIGNUP: {
      return state.set("postSignup", value);
    }
    case AUTH_POST_LOGOUT:
      return state.set("getMe", false);
    default:
      return state;
  }
};
