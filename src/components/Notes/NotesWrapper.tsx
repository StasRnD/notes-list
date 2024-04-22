import React from "react";
import { NotesList } from "./NotesList/NotesList";
import { useDispatch, useSelector } from "react-redux";
import { NoteItemProps } from "../../types";
import { deleteNote, updateGroupInNote } from "../../store/notes/slice";
import { SelectorNotes } from "../../store/notes/selectors";

interface NotesWrapperProps {
  handleToggleOpenPopupWithNoteForm: VoidFunction;
}

export const NotesWrapper: React.FC<NotesWrapperProps> = ({
  handleToggleOpenPopupWithNoteForm,
}) => {
  const dispatch = useDispatch();
  const filerNotes = useSelector(SelectorNotes.filterNotesList);

  const handleToggleGroupItem = (
    event: React.MouseEvent<HTMLImageElement>,
    name: keyof NoteItemProps["groups"],
    item: NoteItemProps,
  ) => {
    event.stopPropagation();
    if (name === "isTrust" && item.groups.isTrust) {
      dispatch(deleteNote(item.id));
      return;
    }
    dispatch(updateGroupInNote({ item, name }));
  };
  return (
    <NotesList
      handleToggleGroupItem={handleToggleGroupItem}
      handleToggleOpenPopupWithNoteForm={handleToggleOpenPopupWithNoteForm}
      filerNotes={filerNotes}
    />
  );
};
