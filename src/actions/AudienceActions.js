import actionTypes from "../constants/actionTypes";

import API from "../constants/apiEndpoints";
import {dispatchRequest} from "./ApiActions";

const {
  AUDIENCE_POST,
  AUDIENCE_GET_LIST,
  AUDIENCE_POST_INVITE,
} = actionTypes;

export const getAudience = () => JSON.parse(localStorage.getItem("audience")) || {};
export const setAudience = (audience) => localStorage.setItem("audience", JSON.stringify(audience));

export function postAudience(params) {
  return dispatchRequest({
    method: "post",
    url: API[AUDIENCE_POST],
    params,
    type: AUDIENCE_POST,
  });
}

export function getAudienceList(params) {
  return dispatchRequest({
    method: "get",
    url: API[AUDIENCE_GET_LIST],
    params,
    type: AUDIENCE_GET_LIST,
  });
}

export function postAudienceInvite(params) {
  return dispatchRequest({
    method: "post",
    url: API[AUDIENCE_POST_INVITE],
    params,
    type: AUDIENCE_POST_INVITE,
  });
}
