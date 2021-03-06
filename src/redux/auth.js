import {
  domain,
  jsonHeaders,
  handleJsonResponse,
  getInitStateFromStorage,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer
} from "./helpers";
import { LOGOUT } from "./helpers/LOGOUT.action";

const url = domain + "/auth";

const LOGIN = createActions("login");
export const login = loginData => dispatch => {
  dispatch(LOGIN.START());

  return fetch(url + "/login", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(loginData)
  })
    .then(handleJsonResponse)
    .then(result => dispatch(LOGIN.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(LOGIN.FAIL(err))));
};

// LOGOUT is defined in another module so that we don't
// have to move handleJsonResponse to another module instead
export const logout = () => (dispatch, getState) => {
  dispatch(LOGOUT.START());

  const token = getState().auth.login.result.token;

  return fetch(url + "/logout", {
    method: "GET",
    headers: { Authorization: "Bearer " + token, ...jsonHeaders }
  })
    .then(handleJsonResponse)
    .then(result => dispatch(LOGOUT.SUCCESS(result)))
    .catch(err => Promise.reject(dispatch(LOGOUT.FAIL(err))));
};

const REGISTER = createActions("register");
export const register = registerData => dispatch => {
  dispatch(REGISTER.START());

  return fetch(domain + "/users", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(registerData)
  })
    .then(handleJsonResponse)
    .then(result => {
      dispatch(REGISTER.SUCCESS(result));
      let loginData = {
        username: registerData.username,
        password: registerData.password
      };
      dispatch(login(loginData));
    })
    .catch(err => Promise.reject(dispatch(REGISTER.FAIL(err))));
};

export const authReducers = {
  login: createReducer(getInitStateFromStorage("login", asyncInitialState), {
    ...asyncCases(LOGIN),
    [LOGOUT.SUCCESS.toString()]: (state, action) => asyncInitialState
  }),
  logout: createReducer(asyncInitialState, {
    ...asyncCases(LOGOUT)
  }),
  register: createReducer(asyncInitialState, {
    ...asyncCases(REGISTER)
  })
};
