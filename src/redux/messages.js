import {
  domain,
  handleJsonResponse,
  createActions,
  createReducer,
  getInitStateFromStorage,
  asyncCases
} from "./helpers";

const url = domain + "/messages";

const GETMESSAGES = createActions("getMessages");
export const getMessages = () => dispatch => {
  dispatch(GETMESSAGES.START());

  return fetch(url + "/?limit=100&offset=0")
    .then(handleJsonResponse)
    .then(result => {
      console.log(result);
      result = Object.keys(result.messages).map(key => result.messages[key]);
      dispatch({
        type: GETMESSAGES.SUCCESS,
        payload: result
      });
    })
    .catch(err => Promise.reject(dispatch(GETMESSAGES.FAIL(err))));
};

const initialState = {
  result: null,
  loading: false,
  error: null
};

export const messageReducers = {
  getMessages: createReducer(
    getInitStateFromStorage("getMessages", initialState),
    { ...asyncCases(GETMESSAGES) }
  )
};
