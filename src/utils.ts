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
