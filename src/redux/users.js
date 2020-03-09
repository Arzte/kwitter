import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer
  } from "./helpers";
  
  
  const url = domain + "/users";
  
  const CREATEUSER = createActions("createuser");
  export const createuser = userData => dispatch => {
    dispatch(CREATEUSER.START());
  
    return fetch(url, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(userData)
    })
      .then(handleJsonResponse)
      .then(result => dispatch(CREATEUSER.SUCCESS(result)))
      .catch(err => Promise.reject(dispatch(CREATEUSER.FAIL(err))));
  };
  
  
  export const reducers = {
    user: createReducer(asyncInitialState, {
      ...asyncCases(CREATEUSER)
    })
  };