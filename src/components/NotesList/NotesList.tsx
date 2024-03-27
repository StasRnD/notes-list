import { filterByTags, updateNotes } from "../../utils";
import { NoteItemComponent } from "../NoteItem/NoteItem";
import React from "react";
import { FilterSetting, NoteItemProps } from "../../types";

interface NotesListProps {
  notes: NoteItemProps[];
  filterSetting: FilterSetting;
  searchValue: string;
  setNotes: React.Dispatch<React.SetStateAction<NoteItemProps[]>>;
  handleToggleOpenPopupWithNoteForm: (item: NoteItemProps) => void;
}
export const NotesList: React.FC<NotesListProps> = ({
  notes,
  filterSetting,
  searchValue,
  setNotes,
  handleToggleOpenPopupWithNoteForm,
}) => {
  const filterNotes = notes
    .filter((item) => {
      if (filterSetting.groups === "isTrust") {
        return item.groups.isTrust;
      }
      if (filterSetting.groups === "isFavorite") {
        return item.groups.isFavorite && !item.groups.isTrust;
      }
      return !item.groups.isTrust;
    })
    .filter((item) => {
      return filterByTags(item, filterSetting.tags);
    })
    .filter((item) => {
      return (item.title + item.description + item.list.join(""))
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase().trim());
    });

  const deleteNote = (id: number) => {
    const newArray = notes.filter((item) => {
      return item.id !== id;
    });

    updateNotes({ notes: newArray, setNotes });
  };

  return (
    <ul className={"NotesList"}>
      {filterNotes.length > 0 ? (
        filterNotes.map((item) => {
          return (
            <NoteItemComponent
              onClick={() => handleToggleOpenPopupWithNoteForm(item)}
              item={item}
              deleteNoteItem={() => deleteNote(item.id)}
              setNotes={setNotes}
              notes={notes}
            />
          );
        })
      ) : (
        <span>ничего не найдено</span>
      )}
    </ul>
  );
};
