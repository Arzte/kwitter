import {
    domain,
    handleJsonResponse,
    createActions,
    createReducer,
    getInitStateFromStorage,
    asyncCases
  } from "./helpers";
  
  const url = domain + "/users";
  
  const GETUSERS = createActions("getUsers");
  export const getUsers = () => dispatch => {
    dispatch(GETUSERS.START());
  
    return fetch(url + "/?limit=25&offset=0")
      .then(handleJsonResponse)
      .then(result => {
        console.log(result);
        result = Object.keys(result.users).map(key => result.users[key]);
        dispatch({
          type: GETUSERS.SUCCESS,
          payload: result
        });
      })
      .catch(err => Promise.reject(dispatch(GETUSERS.FAIL(err))));
  };
  
  const initialState = {
    result: null,
    loading: false,
    error: null
  };
  
  export const usersReducer = {
    getUsers: createReducer(
      getInitStateFromStorage("getUsers", initialState),
      { ...asyncCases(GETUSERS) }
    )
  };
  