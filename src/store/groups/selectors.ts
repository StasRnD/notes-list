import { rootState } from "../types";
import { createSelector } from "@reduxjs/toolkit";

const activeGroupState = (state: rootState) => state.activeGroup;
const activeGroup = createSelector(activeGroupState, (state) => state);

export const SelectorsGroup = {
  activeGroup,
};
