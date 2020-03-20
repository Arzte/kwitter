import { createAction } from "@reduxjs/toolkit";

// We redefine this here so that we don't have to
// move handleJsonResponse to another module
export const createActions = actionName => ({
  START: createAction(actionName + "/start"),
  SUCCESS: createAction(actionName + "/success"),
  FAIL: createAction(actionName + "/fail")
});

export const LOGOUT = createActions("logout");

export default LOGOUT;
