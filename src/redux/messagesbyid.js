/*import { domain, handleJsonResponse, createActions, createReducer, getInitStateFromStorage, asyncCases } from "./helpers";

const url = domain + "/messages";
const GETMESSAGEBYID = createActions("getMessageById");
export const getMessageById = (id) => dispatch => {
  dispatch(GETMESSAGEBYID.START());

  return fetch("https://kwitter-api.herokuapp.com/messages/2257")
    .then(handleJsonResponse)
    .then(result => {
        console.log(result)
        result = Object.keys(result.message).map(key => result.message[key]);
        dispatch({
        type: GETMESSAGEBYID.SUCCESS,
        payload: result
      });
    })
    .catch(err => Promise.reject(dispatch(GETMESSAGEBYID.FAIL(err))));
};



const initialState = {
    result: null,
    loading: false,
    error: null
}

export const messageIdReducers = {
    getMessagesId: createReducer(getInitStateFromStorage("getMessageById", initialState), {...asyncCases(GETMESSAGEBYID)})

}
*/