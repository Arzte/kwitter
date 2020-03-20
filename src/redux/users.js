import {
    domain,
    jsonHeaders,
    handleJsonResponse,
    asyncInitialState,
    asyncCases,
    createActions,
    createReducer,
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
   
  const UPDATEUSER = createActions ("updateuser");
  export const updateuser = (userData, userName) => (dispatch, getState) => {
    dispatch(UPDATEUSER.START());
    let token = getState().auth.login.result.token
    return fetch(url + "/" + userName, {
      method: "PATCH",
      headers: {Authorization: "Bearer " + token,...jsonHeaders}, 
      body: JSON.stringify({ 
        password: userData.password,
        about: userData.about, 
        displayName: userData.displayName 
      })
    })
    .then(handleJsonResponse)
      .then(result => dispatch(UPDATEUSER.SUCCESS(result)))
      .catch(err => Promise.reject(dispatch(UPDATEUSER.FAIL(err))));
  };
  //set current user's picture
  
  const USERPIC = createActions("userpic");
export const userpic = (userName) => (dispatch, getState) => {
  dispatch(USERPIC.START());

  let token = getState().auth.login.result.token;

  return fetch(url + "/" + userName, {
    method: "PUT",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => dispatch(USERPIC.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(USERPIC.FAIL(err))));
};
 
  export const reducers = {
    user: createReducer(asyncInitialState, {
      ...asyncCases(CREATEUSER, UPDATEUSER, USERPIC)
    })
  };