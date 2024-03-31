import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagProps } from "../../types";
import { updateTags } from "../../utils";
import { initialTags } from "../../constans";

export const tagsReducer = createSlice({
  name: "tagsReducer",
  initialState: initialTags,
  reducers: {
    addTag(state, { payload }: PayloadAction<TagProps>) {
      state.push(payload);
      updateTags(state);
    },
  },
});

export const { addTag } = tagsReducer.actions;
