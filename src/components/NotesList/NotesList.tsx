import { filterByTags } from "../../utils";
import { NoteItemComponent } from "../NoteItem/NoteItem";
import React from "react";
import { NoteItemProps } from "../../types";
import { useSelector } from "react-redux";
import { SelectorNotes } from "../../store/notes/selectors";
import { SelectorSearch } from "../../store/search/selectors";
import { SelectorTags } from "../../store/tags/selectors";
import { SelectorsGroup } from "../../store/groups/selectors";

interface NotesListProps {
  handleToggleOpenPopupWithNoteForm: (item: NoteItemProps) => void;
}
export const NotesList: React.FC<NotesListProps> = ({
  handleToggleOpenPopupWithNoteForm,
}) => {
  const notesList = useSelector(SelectorNotes.notesList);
  const activeTags = useSelector(SelectorTags.activeTags);
  const activeGroup = useSelector(SelectorsGroup.activeGroup);
  const searchValue = useSelector(SelectorSearch.searchValue);
  const filterNotes = notesList
    .filter((item) => {
      if (activeGroup === "isTrust") {
        return item.groups.isTrust;
      }
      if (activeGroup === "isFavorite") {
        return item.groups.isFavorite && !item.groups.isTrust;
      }
      return !item.groups.isTrust;
    })
    .filter((item) => {
      return filterByTags(item, activeTags);
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
