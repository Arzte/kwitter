import {
    domain,
    handleJsonResponse,
    createActions,
    createReducer,
    asyncCases,
    asyncInitialState,
    jsonHeaders
  } from "./helpers";
  
  const url = domain + "/users";
  
  const GETAUSERPIC = createActions("getaUserPic");
  export const getaUserPic = (id) => dispatch => {
    dispatch(GETAUSERPIC.START());
  
    return fetch(url + "/" + id + "/picture", {
      method: "GET",
      //headers: { Authorization: "Bearer " + token, ...jsonHeaders }
    })
      .then(handleJsonResponse)
      .then(result => {
        dispatch(GETAUSERPIC.SUCCESS(result));
      })
      .catch(err => Promise.reject(dispatch(GETAUSERPIC.FAIL(err))));
  };
  
  export const getaUserPicReducer = {
    getaUserPic: createReducer(asyncInitialState, {
      ...asyncCases(GETAUSERPIC)
    })
  };
  