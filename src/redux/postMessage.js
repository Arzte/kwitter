import {
    domain,
    handleJsonResponse,
    createActions,
    createReducer,
    asyncCases,
    asyncInitialState,
    jsonHeaders
  } from "./helpers";
  import { getMessages} from './messages'
  
  const url = domain + "/messages";

const POSTMESSAGE = createActions("postMessage");
export const postMessage = messageData => (dispatch, getState) => {
  dispatch(POSTMESSAGE.START());

  const token = getState().auth.login.result.token;


  return fetch(url, {
    method: "POST",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders },
    body: JSON.stringify({ text: messageData })
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(POSTMESSAGE.SUCCESS(result));
      dispatch(getMessages());
    })
    .catch(err => Promise.reject(dispatch(POSTMESSAGE.FAIL(err))));
};

export const postMessageReducer = {
    
    postMessage: createReducer(asyncInitialState, {
      ...asyncCases(POSTMESSAGE)
    })
  };
  