import { NoteItemProps, TagProps } from "../types";

export interface rootState {
  tags: {
    tags: TagProps[];
    activeTags: NoteItemProps["tags"];
  };
  notes: {
    notesList: NoteItemProps[];
    noteToForm: NoteItemProps & { listItemText: string };
  };
  searchValue: string;
  activeGroup: keyof NoteItemProps["groups"] | null;
}
