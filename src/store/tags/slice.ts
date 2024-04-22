import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TagProps } from "../../types";
import { updateTags } from "../../utils";
import { initialFilterTags, initialTags } from "../../constans";

export const tagsReducer = createSlice({
  name: "tagsReducer",
  initialState: { tags: initialTags, activeTags: initialFilterTags },
  reducers: {
    addGlobalTag(state, { payload }: PayloadAction<TagProps>) {
      state.tags.push(payload);
      updateTags(state.tags);
    },

    updateActiveTags(state, { payload }: PayloadAction<string>) {
      const newActiveTags = state.activeTags;
      newActiveTags[payload] = !newActiveTags[payload];
      state.activeTags = newActiveTags;
    },

    reorderTagsList(
      state,
      { payload }: PayloadAction<{ from: number; to: number }>,
    ) {
      const tags = state.tags;

      const { from, to } = payload;
      const copy = [...tags];
      const [removed] = copy.splice(from, 1);
      copy.splice(to, 0, removed);
      state.tags = copy;
    },
  },
});

export const { addGlobalTag, updateActiveTags, reorderTagsList } =
  tagsReducer.actions;
