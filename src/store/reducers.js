import { combineReducers } from "@reduxjs/toolkit";
import slice from "./campaign/slice";
import authSlice from "./auth/auth-slice";
import darkmodeSlice from "./darkmode/darkmode-slice";
import accessSlice from "./access/access-slice";

export const reducer = combineReducers({
  campaign: slice,
  auth: authSlice,
  access: accessSlice,
  darkMode: darkmodeSlice,
});
