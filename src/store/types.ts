import { FilterSetting, NoteItemProps, TagProps } from "../types";

export interface rootState {
  tags: TagProps[];
  notes: {
    notesList: NoteItemProps[];
    noteToForm: NoteItemProps & { listItemText: string };
    filterSetting: FilterSetting;
  };
}
