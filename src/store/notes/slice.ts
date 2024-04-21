import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteItemProps, TagProps } from "../../types";
import {
  filterByActiveGroup,
  filterBySearchValue,
  filterByTags,
  updateNotes,
} from "../../utils";
import { initialDataForm, initialNotes } from "../../constans";

export const notesReducer = createSlice({
  name: "notesReducer",
  initialState: {
    notesList: initialNotes,
    noteToForm: initialDataForm,
    filteredNotesList: [] as NoteItemProps[],
  },
  reducers: {
    addNote(state, { payload }: PayloadAction<NoteItemProps>) {
      state.notesList.push(payload);
      updateNotes(state.notesList);
    },
    deleteNote(state, { payload }: PayloadAction<number>) {
      state.notesList = state.notesList.filter((note) => {
        return Number(note.id) !== payload;
      });
      updateNotes(state.notesList);
    },
    updateNote(state, { payload }: PayloadAction<NoteItemProps>) {
      state.notesList[payload.id - 1] = payload;
      updateNotes(state.notesList);
    },
    updateGroupInNote(
      state,
      {
        payload,
      }: PayloadAction<{
        item: NoteItemProps;
        name: keyof NoteItemProps["groups"];
      }>,
    ) {
      state.notesList = state.notesList.map((note): NoteItemProps => {
        if (note.id === payload.item.id) {
          const noteWithChangeGroup = note;
          noteWithChangeGroup.groups[payload.name] = !note.groups[payload.name];
          return noteWithChangeGroup;
        }
        return note;
      });

      updateNotes(state.notesList);
    },
    updateNoteToForm(state, { payload }: PayloadAction<NoteItemProps>) {
      state.noteToForm = payload;
    },

    getFilterNotesList(
      state,
      {
        payload,
      }: PayloadAction<{
        searchValue: string;
        activeGroup: keyof NoteItemProps["groups"] | null;
        activeTags: NoteItemProps["tags"];
      }>,
    ) {
      state.filteredNotesList = state.notesList
        .filter((item) => filterByActiveGroup(item, payload.activeGroup))
        .filter((item) => filterByTags(item, payload.activeTags))
        .filter((item) => filterBySearchValue(item, payload.searchValue));
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNote,
  updateGroupInNote,
  updateNoteToForm,
  getFilterNotesList,
} = notesReducer.actions;
