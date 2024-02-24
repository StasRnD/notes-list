import { NoteItem } from "./components/types";
import React from "react";

interface UpdateNotesProps {
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
  notes: NoteItem[];
}

export const updateNotes = ({ notes, setNotes }: UpdateNotesProps) => {
  setNotes(notes);
  localStorage.setItem("notes", JSON.stringify(notes, null, 1));
};
