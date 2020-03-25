import { jsonHeaders, handleJsonResponse, createActions } from "./helpers";
import { url } from "./users";


export const UPDATEUSER = createActions("updateuser");
export const updateuser = (userData, userName) => (dispatch, getState) => {
  dispatch(UPDATEUSER.START());
  let token = getState().auth.login.result.token;
  return fetch(url + "/" + userName, {
    method: "PATCH",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({
      password: userData.password,
      about: userData.about,
      displayName: userData.displayName
    })
  })
    .then(handleJsonResponse)
    .then(result => dispatch(UPDATEUSER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(UPDATEUSER.FAIL(err))));
};
