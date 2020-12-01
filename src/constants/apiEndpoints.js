const {
  REACT_APP_API_URL,
} = process.env;

export default {
  // AUTH
  AUTH_POST_SIGNUP: `${REACT_APP_API_URL}/auth/signup`,
  AUTH_POST_SIGNIN: `${REACT_APP_API_URL}/auth/signin`,
  AUTH_GET_ME: `${REACT_APP_API_URL}/auth/me`,
  AUTH_POST_LOGOUT: `${REACT_APP_API_URL}/auth/logout`,

  // SURVEY
  SURVEY_POST: `${REACT_APP_API_URL}/surveys`,
  SURVEY_GET: `${REACT_APP_API_URL}/surveys/{id}`,
  SURVEY_GET_LIST: `${REACT_APP_API_URL}/surveys`,
  SURVEY_PUT: `${REACT_APP_API_URL}/surveys/{id}`,
  SURVEY_DELETE: `${REACT_APP_API_URL}/surveys/{id}`,

  // AUDIENCE
  AUDIENCE_POST: `${REACT_APP_API_URL}/audiences`,
  AUDIENCE_GET_LIST: `${REACT_APP_API_URL}/audiences`,
  AUDIENCE_POST_INVITE: `${REACT_APP_API_URL}/audiences/invite`,
};

export const render = (str, obj) => (
  Object.keys(obj).reduce((p, c) => p.split(`{${c}}`).join(obj[c]), str)
);
