import { rootState } from "../types";
import { createSelector } from "@reduxjs/toolkit";

const searchValueState = (state: rootState) => state.searchValue;
const searchValue = createSelector(searchValueState, (state) => state);

export const SelectorSearch = {
  searchValue,
};
