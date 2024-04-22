import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NoteItemProps, TagProps } from "../../types";
import { filterNotes, updateNotes, updateTags } from "../../utils";
import {
  initialDataForm,
  initialFilterTags,
  initialNotes,
  initialTags,
} from "../../constans";
import { store } from "../store";

export const notesReducer = createSlice({
  name: "notesReducer",
  initialState: {
    notesList: initialNotes,
    noteToForm: initialDataForm,
    filteredNotesList: initialNotes,
    searchValue: "",
    activeGroup: null as null | keyof NoteItemProps["groups"],
    tags: initialTags,
    activeTags: initialFilterTags,
  },
  reducers: {
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
      state.filteredNotesList = filterNotes(
        state.notesList,
        payload.searchValue,
        payload.activeGroup,
        payload.activeTags,
      );
    },
    addNote(state, { payload }: PayloadAction<NoteItemProps>) {
      state.notesList.push(payload);
      updateNotes(state.notesList);
      // store.dispatch(
      //   getFilterNotesList({
      //     searchValue: state.searchValue,
      //     activeGroup: state.activeGroup,
      //     activeTags: state.activeTags,
      //   }),
      // );
    },

    deleteNote(state, { payload }: PayloadAction<number>) {
      state.notesList = state.notesList.filter((note) => {
        return Number(note.id) !== payload;
      });
      updateNotes(state.notesList);
      state.filteredNotesList = filterNotes(
        state.notesList,
        state.searchValue,
        state.activeGroup,
        state.activeTags,
      );
    },
    updateNote(state, { payload }: PayloadAction<NoteItemProps>) {
      state.notesList[payload.id - 1] = payload;
      updateNotes(state.notesList);
      state.filteredNotesList = filterNotes(
        state.notesList,
        state.searchValue,
        state.activeGroup,
        state.activeTags,
      );
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
      state.filteredNotesList = filterNotes(
        state.notesList,
        state.searchValue,
        state.activeGroup,
        state.activeTags,
      );
    },
    updateNoteToForm(state, { payload }: PayloadAction<NoteItemProps>) {
      state.noteToForm = payload;
    },

    changeSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
      state.filteredNotesList = filterNotes(
        state.notesList,
        state.searchValue,
        state.activeGroup,
        state.activeTags,
      );
    },
    updateActiveGroup: (
      state,
      { payload }: PayloadAction<keyof NoteItemProps["groups"] | null>,
    ) => {
      state.activeGroup = payload;
      state.filteredNotesList = filterNotes(
        state.notesList,
        state.searchValue,
        state.activeGroup,
        state.activeTags,
      );
    },
    addGlobalTag(state, { payload }: PayloadAction<TagProps>) {
      state.tags.push(payload);
      updateTags(state.tags);
    },

    updateActiveTags(state, { payload }: PayloadAction<string>) {
      const newActiveTags = state.activeTags;
      newActiveTags[payload] = !newActiveTags[payload];
      state.activeTags = newActiveTags;
      state.filteredNotesList = filterNotes(
        state.notesList,
        state.searchValue,
        state.activeGroup,
        state.activeTags,
      );
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

export const {
  addNote,
  deleteNote,
  updateNote,
  updateGroupInNote,
  updateNoteToForm,
  changeSearchValue,
  updateActiveGroup,
  addGlobalTag,
  updateActiveTags,
  reorderTagsList,
  getFilterNotesList,
} = notesReducer.actions;
