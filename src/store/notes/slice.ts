import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSetting, NoteItemProps } from "../../types";
import { updateNotes } from "../../utils";
import { initialDataForm, initialFilter, initialNotes } from "../../constans";

export const notesReducer = createSlice({
  name: "notesReducer",
  initialState: {
    notesList: initialNotes,
    noteToForm: initialDataForm,
    filterSetting: initialFilter,
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

    updateTagForFilterSetting(state, { payload }: PayloadAction<string>) {
      const newFilterSetting = state.filterSetting;
      newFilterSetting.tags[payload] = !newFilterSetting.tags[payload];
      state.filterSetting = newFilterSetting;
    },

    updateGroupForFilterSetting(
      state,
      { payload }: PayloadAction<FilterSetting["groups"]>,
    ) {
      const newFilterSetting = state.filterSetting;
      newFilterSetting.groups = payload;
      state.filterSetting = newFilterSetting;
    },
  },
});

export const {
  addNote,
  deleteNote,
  updateNote,
  updateGroupInNote,
  updateNoteToForm,
  updateTagForFilterSetting,
  updateGroupForFilterSetting,
} = notesReducer.actions;
