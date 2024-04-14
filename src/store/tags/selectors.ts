import { rootState } from "../types";
import { createSelector } from "@reduxjs/toolkit";

const tags = (state: rootState) => state.tags;
const tagsList = createSelector(tags, (state) => {
  return state.tags;
});
const activeTags = createSelector(tags, (state) => {
  return state.activeTags;
});

export const SelectorTags = {
  tagsList,
  activeTags,
};
