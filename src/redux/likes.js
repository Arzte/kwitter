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
import { store } from "../redux/index";

const url = domain;

const LIKEMESSAGE = createActions("likeMessage");
export const likeMessage = (e, id) => (dispatch, getState) => {
  dispatch(LIKEMESSAGE.START());

  const token = getState().auth.login.result.token;

  return fetch(url + "/likes", {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({ messageId: id })
  })
    .then(handleJsonResponse)
    .then(result => {
      if (result.statusCode === 200) {
        dispatch(getMessages());
      } else if (result.statusCode === 400) {
        dispatch(unLikeMessage(id));
      }
      dispatch(LIKEMESSAGE.SUCCESS(result));
    })

    .catch(err => {
      if (err.statusCode === 400) {
        dispatch(unLikeMessage(id));
      }
      Promise.reject(dispatch(LIKEMESSAGE.FAIL(err)));
    });
};

const UNLIKEMESSAGE = createActions("unLikeMessage");
export const unLikeMessage = messageID => dispatch => {
  const state = store.getState();
  const username = state.auth.login.result.username;
  const token = state.auth.login.result.token;

  dispatch(UNLIKEMESSAGE.START());

  return fetch(url + "/messages/" + messageID, {
    method: "GET"
  })
    .then(handleJsonResponse)
    .then(result => {
      result.message.likes.map(each => {
        if (each.username === username) {
          const likeID = each.id;
          console.log(likeID);
          fetch(url + "/likes/" + likeID, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + token, ...jsonHeaders }
          })
            .then(handleJsonResponse)
            .then(result => {
              dispatch(UNLIKEMESSAGE.SUCCESS(result));
              dispatch(getMessages());
            });
        }
        return each.id;
      });
    });
};

export const likeMessageReducer = {
  likeMessage: createReducer(asyncInitialState, {
    ...asyncCases(LIKEMESSAGE)
  }),
  unLikeMessage: createReducer(asyncInitialState, {
    ...asyncCases(UNLIKEMESSAGE)
  })
};
