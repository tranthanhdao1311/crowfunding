import { createSlice } from "@reduxjs/toolkit";

const initState = localStorage.getItem("firstAccess");
const parseInitState = JSON.parse(initState);

const accessSlice = createSlice({
  name: "access",
  initialState: {
    firstAccess: parseInitState,
  },
  reducers: {
    setFirstAccess: (state, action) => ({
      firstAccess: action.payload,
    }),
  },
});

export const { setFirstAccess } = accessSlice.actions;

export default accessSlice.reducer;
