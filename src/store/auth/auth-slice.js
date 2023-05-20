import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    accessToken: null,
  },
  reducers: {
    authLogin: (state, action) => ({
      ...state,
      user: action.payload,
    }),
    authRegister: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authUpdateUser: (state, action) => ({
      ...state,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),

    authFetchMe: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    profileUser: (state, action) => ({}),

    authRefreshToken: (state, action) => ({}),
    authLogoutUser: (state, action) => ({}),
  },
});

export const {
  authLogin,
  authRegister,
  authUpdateUser,
  authFetchMe,
  authRefreshToken,
  authLogoutUser,
} = authSlice.actions;

export default authSlice.reducer;
