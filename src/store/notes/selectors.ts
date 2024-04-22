import { rootState } from "../types";
import { createSelector } from "@reduxjs/toolkit";

const notes = (state: rootState) => state.notes;
const notesList = createSelector(notes, (state) => {
  return state.notesList;
});
const noteToForm = createSelector(notes, (state) => {
  return state.noteToForm;
});
const filterNotesList = createSelector(notes, (state) => {
  return state.filteredNotesList;
});

const searchValue = createSelector(notes, (state) => {
  return state.searchValue;
});

const activeGroup = createSelector(notes, (state) => state.activeGroup);

const tagsList = createSelector(notes, (state) => {
  return state.tags;
});
const activeTags = createSelector(notes, (state) => {
  return state.activeTags;
});

export const SelectorNotes = {
  notesList,
  noteToForm,
  filterNotesList,
  searchValue,
  activeGroup,
  tagsList,
  activeTags,
};
