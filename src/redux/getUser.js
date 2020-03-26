import {
  domain,
  handleJsonResponse,
  createActions,
  createReducer,
  asyncCases,
  asyncInitialState
} from "./helpers";

const url = domain + "/users";

const GETAUSER = createActions("getaUser");
export const getaUser = id => dispatch => {
  dispatch(GETAUSER.START());

  return fetch(url + "/" + id, {
    method: "GET"
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(GETAUSER.SUCCESS(result));
    })
    .catch(err => Promise.reject(dispatch(GETAUSER.FAIL(err))));
};

export const getaUserReducer = {
  getaUser: createReducer(asyncInitialState, {
    ...asyncCases(GETAUSER)
  })
};
