import {
  domain,
  jsonHeaders,
  handleJsonResponse,
  asyncInitialState,
  asyncCases,
  createActions,
  createReducer
} from "./helpers";
import { login } from "./index";

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

export const regsiterReducer = {
  register: createReducer(asyncInitialState, {
    ...asyncCases(REGISTER)
  })
};
