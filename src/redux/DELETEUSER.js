import { jsonHeaders, handleJsonResponse, createActions } from "./helpers";
import { url } from "./users";
const DELETEUSER = createActions("deleteuser");
export const deleteuser = (userName) => (dispatch, getState) => {
  dispatch(DELETEUSER.START());
  let token = getState().auth.login.result.token;
  return fetch(url + "/" + userName, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => dispatch(DELETEUSER.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(DELETEUSER.FAIL(err))));
};
