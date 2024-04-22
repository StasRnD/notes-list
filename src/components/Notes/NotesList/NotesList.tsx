import { NoteItemComponent } from "../NoteItem/NoteItem";
import React from "react";
import { NoteItemProps } from "../../../types";

//Сделать WRAPPER для noteList, сделать компонент максимально независимым)

interface NotesListProps {
  handleToggleOpenPopupWithNoteForm: (item: NoteItemProps) => void;
  filerNotes: NoteItemProps[];
  handleToggleGroupItem: (
    event: React.MouseEvent<HTMLImageElement>,
    name: keyof NoteItemProps["groups"],
    item: NoteItemProps,
  ) => void;
}
export const NotesList: React.FC<NotesListProps> = ({
  handleToggleOpenPopupWithNoteForm,
  filerNotes,
  handleToggleGroupItem,
}) => {
  return (
    <ul className={"NotesList"}>
      {filerNotes.length > 0 ? (
        filerNotes.map((item) => {
          return (
            <NoteItemComponent
              onClick={() => handleToggleOpenPopupWithNoteForm(item)}
              item={item}
              handleToggleGroupItem={handleToggleGroupItem}
            />
          );
        })
      ) : (
        <span>ничего не найдено</span>
      )}
    </ul>
  );
};
