import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteItemProps } from "../../types";

export const groupsReducer = createSlice({
  name: "groupsReducer",
  initialState: null as null | keyof NoteItemProps["groups"],
  reducers: {
    updateActiveGroup(
      state,
      { payload }: PayloadAction<keyof NoteItemProps["groups"] | null>,
    ) {
      return (state = payload);
    },
  },
});

export const { updateActiveGroup } = groupsReducer.actions;
