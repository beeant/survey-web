import {Record, OrderedMap} from "immutable";

import actionTypes from "../constants/actionTypes";

const {
  AUDIENCE_GET_LIST,
} = actionTypes;

const InitialState = new Record({
  getAudienceList: new OrderedMap(),
  audiencePagination: {
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
    case AUDIENCE_GET_LIST: {
      const {rows, count} = value;
      return state
        .set(
          "getAudienceList",
          rows.reduce((d, v) => d.set(v.id, v), new OrderedMap()),
        )
        .set("audiencePagination", {
          page: params.page,
          liimt: params.limit,
          total: count,
        });
    }

    default:
      return state;
  }
};
