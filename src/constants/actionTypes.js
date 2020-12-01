const actionTypes = [
  "API_SET",

  "AUTH_POST_SIGNUP",
  "AUTH_POST_SIGNIN",
  "AUTH_POST_LOGOUT",
  "AUTH_GET_ME",

  "SURVEY_POST",
  "SURVEY_GET",
  "SURVEY_GET_LIST",
  "SURVEY_PUT",
  "SURVEY_DELETE",

  "AUDIENCE_POST",
  "AUDIENCE_GET_LIST",
  "AUDIENCE_POST_INVITE",
].reduce((
  actionTypes,
  type,
) => ({
  ...actionTypes,
  [type]: type,
}), {});

export default actionTypes;
