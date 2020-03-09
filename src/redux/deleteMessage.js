import {
  domain,
  handleJsonResponse,
  createActions,
  createReducer,
  asyncCases,
  asyncInitialState,
  jsonHeaders
} from "./helpers";
import { getMessages } from "./messages";

const url = domain + "/messages";

const DELETEMESSAGE = createActions("deleteMessage");
export const deleteMessage = (e, id) => (dispatch, getState) => {
  dispatch(DELETEMESSAGE.START());

  const token = getState().auth.login.result.token;

  dispatch(getMessages());

  return fetch(url + "/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
    //body: JSON.stringify({ id: id })
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(getMessages());
      dispatch(DELETEMESSAGE.SUCCESS(result));
    })
    .catch(err => Promise.reject(dispatch(DELETEMESSAGE.FAIL(err))));
};

export const deleteMessageReducer = {
  deleteMessage: createReducer(asyncInitialState, {
    ...asyncCases(DELETEMESSAGE)
  })
};
