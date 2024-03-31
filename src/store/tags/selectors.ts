import { rootState } from "../types";
import { createSelector } from "@reduxjs/toolkit";

const tags = (state: rootState) => state;
const tagsList = createSelector(tags, (state) => {
  return state.tags;
});

export const SelectorTags = {
  tagsList,
};
