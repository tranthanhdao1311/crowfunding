import { combineReducers } from "@reduxjs/toolkit";
import slice from "./campaign/slice";
import authSlice from "./auth/auth-slice";

export const reducer = combineReducers({
  campaign: slice,
  auth: authSlice,
});
