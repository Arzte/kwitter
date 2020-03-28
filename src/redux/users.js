import {
  domain,
  handleJsonResponse,
  createActions,
  createReducer,
  getInitStateFromStorage,
  asyncCases,
  asyncInitialState
} from "./helpers";

const url = domain + "/users";

const GETUSER = createActions("getaUser");
export const getUser = id => dispatch => {
  dispatch(GETUSER.START());

  return fetch(url + "/" + id, {
    method: "GET"
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(GETUSER.SUCCESS(result));
    })
    .catch(err => Promise.reject(dispatch(GETUSER.FAIL(err))));
};

const GETUSERS = createActions("getUsers");
export const getUsers = () => dispatch => {
  dispatch(GETUSERS.START());

  return fetch(url + "/?limit=25&offset=0")
    .then(handleJsonResponse)
    .then(result => {
      result = Object.keys(result.users).map(key => result.users[key]);
      dispatch(GETUSERS.SUCCESS(result));
    })
    .catch(err => Promise.reject(dispatch(GETUSERS.FAIL(err))));
};

const initialState = {
  result: null,
  loading: false,
  error: null
};

export const usersReducer = {
  getUsers: createReducer(getInitStateFromStorage("getUsers", initialState), {
    ...asyncCases(GETUSERS)
  }),
  getUser: createReducer(asyncInitialState, {
    ...asyncCases(GETUSER)
  })
};
