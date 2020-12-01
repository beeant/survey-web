import actionTypes from "../constants/actionTypes";

import API, {render} from "../constants/apiEndpoints";
import {dispatchRequest} from "./ApiActions";

const {
  SURVEY_GET_LIST,
  SURVEY_GET,
  SURVEY_POST,
  SURVEY_PUT,
  SURVEY_DELETE,
} = actionTypes;

export function getSurveyList(params) {
  return dispatchRequest({
    method: "get",
    url: API[SURVEY_GET_LIST],
    params,
    type: SURVEY_GET_LIST,
  });
}

export function getSurvey(id) {
  return dispatchRequest({
    method: "get",
    url: render(API[SURVEY_GET], {id}),
    type: SURVEY_GET,
    include: {
      id,
    },
  });
}

export function postSurvey(params) {
  return dispatchRequest({
    method: "post",
    url: API[SURVEY_POST],
    params,
    type: SURVEY_POST,
  });
}

export function putSurvey(params, id) {
  return dispatchRequest({
    method: "put",
    url: render(API[SURVEY_PUT], {id}),
    params,
    type: SURVEY_PUT,
    include: {
      id: params.id,
    },
  });
}

export function deleteSurvey(id) {
  return dispatchRequest({
    method: "delete",
    url: render(API[SURVEY_DELETE], {id}),
    type: SURVEY_DELETE,
    include: {
      id,
    },
  });
}
