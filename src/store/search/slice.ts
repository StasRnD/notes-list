import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const searchReducer = createSlice({
  name: "searchReducer",
  initialState: "",
  reducers: {
    changeSearchValue(state, { payload }: PayloadAction<string>) {
      return (state = payload);
    },
  },
});

export const { changeSearchValue } = searchReducer.actions;
