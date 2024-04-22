import { NoteItemComponent } from "../NoteItem/NoteItem";
import React, { useEffect } from "react";
import { NoteItemProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { SelectorNotes } from "../../store/notes/selectors";
import { SelectorSearch } from "../../store/search/selectors";
import { SelectorTags } from "../../store/tags/selectors";
import { SelectorsGroup } from "../../store/groups/selectors";
import { getFilterNotesList } from "../../store/notes/slice";

interface NotesListProps {
  handleToggleOpenPopupWithNoteForm: (item: NoteItemProps) => void;
  filerNotes: NoteItemProps[];
}
export const NotesList: React.FC<NotesListProps> = ({
  handleToggleOpenPopupWithNoteForm,
  filerNotes,
}) => {
  return (
    <ul className={"NotesList"}>
      {filerNotes.length > 0 ? (
        filerNotes.map((item) => {
          return (
            <NoteItemComponent
              onClick={() => handleToggleOpenPopupWithNoteForm(item)}
              item={item}
            />
          );
        })
      ) : (
        <span>ничего не найдено</span>
      )}
    </ul>
  );
};
