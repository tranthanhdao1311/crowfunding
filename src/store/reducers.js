import { combineReducers } from "@reduxjs/toolkit";
import slice from "./campaign/slice";
import authSlice from "./auth/auth-slice";
import darkmodeSlice from "./darkmode/darkmode-slice";

export const reducer = combineReducers({
  campaign: slice,
  auth: authSlice,
  darkMode: darkmodeSlice,
});
