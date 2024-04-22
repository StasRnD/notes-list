import { NoteItemProps, TagProps } from "../types";

export interface rootState {
  notes: {
    notesList: NoteItemProps[];
    noteToForm: NoteItemProps & { listItemText: string };
    filteredNotesList: NoteItemProps[];
    searchValue: string;
    activeGroup: null | keyof NoteItemProps["groups"];
    tags: TagProps[];
    activeTags: NoteItemProps["tags"];
  };
}
