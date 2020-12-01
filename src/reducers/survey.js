import {Record, OrderedMap} from "immutable";

import actionTypes from "../constants/actionTypes";

const {
  SURVEY_GET_LIST,
  SURVEY_GET,
  SURVEY_PUT,
  SURVEY_POST,
  SURVEY_DELETE,
} = actionTypes;

const InitialState = new Record({
  getListSurvey: new OrderedMap(),
  surveyPagination: {
    page: 0,
    total: 0,
    limit: 0,
  },
});

export default (
  state = new InitialState(),
  {
    value,
    type,
    params,
  },
) => {
  switch (type) {
    case SURVEY_GET_LIST: {
      const {rows, count} = value;
      return state
        .set(
          "getListSurvey",
          rows.reduce((d, v) => d.set(v.id, v), new OrderedMap()),
        )
        .set("surveyPagination", {
          page: params.page,
          liimt: params.limit,
          total: count,
        });
    }

    case SURVEY_GET:
    case SURVEY_PUT:
    case SURVEY_POST: {
      return state
        .setIn([
          "getListSurvey",
          value.id,
        ],
        value);
    }

    case SURVEY_DELETE:
      return state
        .removeIn([
          "getListSurvey",
          params.id,
        ]);

    default:
      return state;
  }
};
