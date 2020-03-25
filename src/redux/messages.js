import {
  domain,
  handleJsonResponse,
  createActions,
  createReducer,
  asyncCases,
  getInitStateFromStorage,
} from "./helpers";

const url = domain + "/messages";

const GETMESSAGES = createActions("getMessages");
export const getMessages = (username = "") => dispatch => {
  dispatch(GETMESSAGES.START());

  let apiString = ""

if (username !== "") {
  apiString = "https://kwitter-api.herokuapp.com/messages?limit=100&offset=0&username=" + username;
  
} else {
  apiString = "https://kwitter-api.herokuapp.com/messages?limit=100&offset=0"
}
  
return fetch(url + apiString) 
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
