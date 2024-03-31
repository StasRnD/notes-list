import { rootState } from "../types";
import { createSelector } from "@reduxjs/toolkit";

const notes = (state: rootState) => state.notes;
const notesList = createSelector(notes, (state) => {
  return state.notesList;
});
const noteToForm = createSelector(notes, (state) => {
  return state.noteToForm;
});

const filterSetting = createSelector(notes, (state) => {
  return state.filterSetting;
});

const filterSettingGroup = createSelector(notes, (state) => {
  return state.filterSetting.groups;
});

export const SelectorNotes = {
  notesList,
  noteToForm,
  filterSetting,
  filterSettingGroup,
};
