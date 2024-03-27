import { NoteItemProps, TagProps } from "./types";
import React from "react";

interface UpdateNotesProps {
  setNotes: React.Dispatch<React.SetStateAction<NoteItemProps[]>>;
  notes: NoteItemProps[];
}

interface AddTagsProps {
  setTags: React.Dispatch<React.SetStateAction<TagProps[]>>;
  tags: TagProps[];
}

export const updateNotes = ({ notes, setNotes }: UpdateNotesProps) => {
  setNotes(notes);
  localStorage.setItem("notes", JSON.stringify(notes, null, 1));
};

export const addTags = ({ tags, setTags }: AddTagsProps) => {
  setTags(tags);
  localStorage.setItem("tags", JSON.stringify(tags, null, 1));
};

export const filterByTags = (
  item: NoteItemProps,
  filterSetting: NoteItemProps["tags"],
) => {
  if (Object.values(filterSetting).every((value) => !Boolean(value))) {
    return true;
  }
  const x = Object.keys(filterSetting).filter((el) => filterSetting[el]);

  return x.some((el) => item.tags[el]);
};
