import { createSlice } from "@reduxjs/toolkit";
const initialState = localStorage.getItem("darkMode");
const parsedData = JSON.parse(initialState);

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    dark: parsedData,
  },
  reducers: {
    setDarkMode: (state, action) => ({
      ...state,
      dark: action.payload,
    }),
  },
});
export const { setDarkMode, restoreDark } = darkModeSlice.actions;
export default darkModeSlice.reducer;
