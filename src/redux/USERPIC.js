
import { jsonHeaders, handleJsonResponse, createActions } from "./helpers";
import { url } from "./users";

export const USERPIC = createActions("userpic");
export const userpic = (userName) => (dispatch, getState) => {
    //set current user's picture
    dispatch(USERPIC.START());
  let token = getState().auth.login.result.token;
  return fetch(url + "/" + userName, {
    method: "PUT",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => dispatch(USERPIC.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(USERPIC.FAIL(err))));
};
