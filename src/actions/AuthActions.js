// @flow

import actionTypes from "../constants/actionTypes";

import API from "../constants/apiEndpoints";
import {
  dispatchRequest,
  setToken,
} from "./ApiActions";

const {
  AUTH_POST_SIGNUP,
  AUTH_POST_SIGNIN,
  AUTH_POST_LOGOUT,
  AUTH_GET_ME,
} = actionTypes;

export function postSignup(params) {
  return dispatchRequest({
    method: "post",
    url: API[AUTH_POST_SIGNUP],
    params,
    type: AUTH_POST_SIGNUP,
  });
}

export function postSignin(params) {
  return dispatchRequest({
    method: "post",
    url: API[AUTH_POST_SIGNIN],
    params,
    type: AUTH_POST_SIGNIN,
  });
}

export function getMe() {
  return dispatchRequest({
    method: "get",
    url: API[AUTH_GET_ME],
    type: AUTH_GET_ME,
    onError: (dispatch) => {
      dispatch({type: AUTH_POST_LOGOUT});
    },
  });
}

export function postLogout() {
  return dispatch => dispatchRequest({
    method: "post",
    url: API[AUTH_POST_LOGOUT],
    type: AUTH_POST_LOGOUT,
  })(dispatch).then((res) => {
    if (res && !res.error) {
      setToken(null);
    }
  });
}
