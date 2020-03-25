import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    createActions,
    createReducer,
    asyncCases,
    asyncInitialState,
  } from "./helpers";
import { UPDATEUSER } from "./UPDATEUSER";
import { USERPIC } from "./USERPIC";
  
  
  export const url = domain + "/users";
  
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

    const initialState = {
      result: null,
      loading: false,
      error: null
    };
 //auth.js
  export const userReducers = {
    CREATEUSER: createReducer(asyncInitialState,("createuser", initialState), {
      ...asyncCases(CREATEUSER)
    }),
    UPDATEUSER: createReducer(asyncInitialState, {
      ...asyncCases(UPDATEUSER),
    }),
    USERPIC: createReducer(asyncInitialState, {
      ...asyncCases(USERPIC)
    }),
    
  };