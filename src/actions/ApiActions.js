import qs from "qs";
import {message} from "antd";

import actionTypes from "../constants/actionTypes";

const {
  API_SET,
  AUTH_GET_ME,
} = actionTypes;

const headers = {
  "Content-Type": 'application/json',
  Accept: "application/json",
};

const reqFunctions = {
  post: apiPost,
  get: apiGet,
  delete: apiDelete,
  put: apiPut,
};

let token;

export function getToken() {
  token = token || window.localStorage.getItem('token');
  return token;
}

export function setToken(newToken) {
  token = newToken;
  window.localStorage.setItem('token', token);
}

export const dispatchRequest = ({
  method,
  url,
  type,
  params,
  onError,
  include = {},
  opts = {},
}) => (
  async (dispatch) => {
    const m = method.toLowerCase();
    const request = reqFunctions[m](url, params, opts);
    const response = await dispatch(request);
    if (!response.error) {
      dispatch({
        type,
        value: response,
        params: {
          ...params,
          ...include,
        },
      });
    }
    if (response.error) {
      if (onError) {
        onError(dispatch);
      }
    }
    return response;
  }
);

function onRequest() {
  return {
    type: API_SET,
    key: "loading",
    value: true,
  };
}

function onResponse(response: Object) {
  return (dispatch: any) => {
    dispatch({type: API_SET, key: "loading", value: false});
    dispatch({type: API_SET, key: "success", value: response});
    return response;
  };
}

function apiFetch(url, options) {
  return async (dispatch: Function) => {
    const {
      headers: {
        ...headers
      },
      ...opts
    } = options;
    opts.body = JSON.stringify(opts.body);

    try {
      const response = await fetch(url, {
        ...opts,
        headers,
      });
      const authToken = response.headers.get("authorization") || response.headers.get("Authorization");
      if (authToken) {
        setToken(authToken);
      }
      const json = await response.json();

      if (response.status >= 200 && response.status < 300) {
        return dispatch(onResponse(json));
      }
      return dispatch(onError(json));
    } catch (error) {
      if (error.response) {
        return dispatch(onError(error.response.data));
      }
      if (error.request) {
        return dispatch(onError(error));
      }
      return dispatch(onError(error));
    }
  };
}

export function apiGet(url: string, query?: Object, opts?: Object) {
  const token = getToken();
  const options = {
    ...opts,
    method: "GET",
    headers: {...headers, Authorization: token},
  };
  const queryString = query && `?${qs.stringify(query, { allowDots: true })}`;
  return (dispatch: Function) => {
    dispatch(onRequest());
    return dispatch(apiFetch(`${url}${queryString || ""}`, options));
  };
}

export function apiPost(url: string, query?: Object, opts?: Object) {
  const token = getToken();
  const options = {
    ...opts,
    method: "POST",
    headers: {...headers, Authorization: token},
    body: query,
  };
  return (dispatch: Function) => {
    dispatch(onRequest());
    return dispatch(apiFetch(url, options));
  };
}

export function apiDelete(url: string, query?: Object, opts?: Object) {
  const token = getToken();
  const options = {
    ...opts,
    method: "DELETE",
    headers: {...headers, Authorization: token},
  };
  const queryString = query && `?${qs.stringify(query, { allowDots: true })}`;
  return (dispatch: Function) => {
    dispatch(onRequest());
    return dispatch(apiFetch(`${url}${queryString || ""}`, options));
  };
}

export function apiPut(url: string, query?: Object, opts?: Object) {
  const token = getToken();
  const options = {
    ...opts,
    method: "PUT",
    headers: {...headers, Authorization: token},
    body: query,
  };
  return (dispatch: Function) => {
    dispatch(onRequest());
    return dispatch(apiFetch(url, options));
  };
}

function onError(response: Object) {
  return (dispatch) => {
    dispatch({type: API_SET, key: "loading", value: false});
    let errorObj = {};
    if (response instanceof Error || typeof response === "string") {
      // Unexpected errors
      const detail = "Unexpected Error";
      errorObj = {
        error: "unexpected",
        detail,
        meta: null,
      };
      message.error({
        content: detail,
        key: "unexpected",
      });

    } else {
      // expect error in JSON format
      const {
        error = "unexpected",
        key,
        detail,
        id,
        meta = {},
        status,
        statusCode, // default error from hapi
      } = response;

      errorObj = {
        error,
        key,
        id,
        status,
        detail,
        meta,
      };
      if (statusCode && statusCode !== 401) {
        message.error({
          content: `error_${statusCode}`,
          key: statusCode,
        });
      } else if (statusCode === 401) {
        // unauthorized
        errorObj.error = "error_401";
        // logout from client
        dispatch({type: AUTH_GET_ME, value: {}});
        setToken(null);
      }
    }

    if (errorObj.key) {
      message.error({
        content: `${errorObj.key} ${errorObj.detail}`,
        duration: 10,
        key: errorObj.key,
      });
    }

    dispatch({type: API_SET, key: "error", value: errorObj});
    return errorObj;
  };
}
