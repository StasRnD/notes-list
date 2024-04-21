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

export const SelectorNotes = {
  notesList,
  noteToForm,
  filterNotesList,
};
