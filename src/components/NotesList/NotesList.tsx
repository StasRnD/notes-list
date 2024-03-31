import { filterByTags } from "../../utils";
import { NoteItemComponent } from "../NoteItem/NoteItem";
import React from "react";
import { NoteItemProps } from "../../types";
import { useSelector } from "react-redux";
import { SelectorNotes } from "../../store/notes/selectors";

interface NotesListProps {
  searchValue: string;
  handleToggleOpenPopupWithNoteForm: (item: NoteItemProps) => void;
}
export const NotesList: React.FC<NotesListProps> = ({
  searchValue,
  handleToggleOpenPopupWithNoteForm,
}) => {
  const notesList = useSelector(SelectorNotes.notesList);
  const filterSetting = useSelector(SelectorNotes.filterSetting);

  const filterNotes = notesList
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

  return (
    <ul className={"NotesList"}>
      {filterNotes.length > 0 ? (
        filterNotes.map((item) => {
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
