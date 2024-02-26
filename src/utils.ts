import { NoteItemProps } from "./types";
import React from "react";

interface UpdateNotesProps {
  setNotes: React.Dispatch<React.SetStateAction<NoteItemProps[]>>;
  notes: NoteItemProps[];
}

export const updateNotes = ({ notes, setNotes }: UpdateNotesProps) => {
  setNotes(notes);
  localStorage.setItem("notes", JSON.stringify(notes, null, 1));
};

export const filterByTags = (
  item: NoteItemProps,
  filterSetting: NoteItemProps["tags"],
) => {
  if (Object.values(filterSetting).every((value) => !Boolean(value))) {
    return true;
  }
  return (
    (item.tags.isBusiness && filterSetting.isBusiness) ||
    (item.tags.isShopping && filterSetting.isShopping) ||
    (item.tags.isOther && filterSetting.isOther)
  );
};
