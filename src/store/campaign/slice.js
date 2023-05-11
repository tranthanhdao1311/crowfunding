import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "campaign",
  initialState: {
    valueSearch: "",
    showResult: false,
    dropdownCate: false,
    labelSelectCate: "Select a category",
    showModal: false,
    toggleSideBar: false,
  },
  reducers: {
    setValueSearch: (state, { payload }) => ({
      ...state,
      valueSearch: payload,
    }),
    setShowResult: (state, { payload }) => ({
      ...state,
      showResult: payload,
    }),
    setDropDownCate: (state, { payload }) => ({
      ...state,
      dropdownCate: payload,
    }),

    setSelectCategory: (state, { payload }) => ({
      ...state,
      labelSelectCate: payload,
    }),
    setShowModal: (state, { payload }) => ({
      ...state,
      showModal: payload,
    }),
    setToggleSideBar: (state, { payload }) => ({
      ...state,
      toggleSideBar: payload,
    }),
  },
});
export const {
  setValueSearch,
  setShowResult,
  setDropDownCate,
  setSelectCategory,
  setShowModal,
  setToggleSideBar,
} = newsSlice.actions;

export default newsSlice.reducer;
