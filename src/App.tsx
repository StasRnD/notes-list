import React, { useEffect, useState } from "react";
import "./index.css";
import { NoteItemProps } from "./types";
import { Popup } from "./components/Popup/Popup";
import { NoteForm } from "./components/NoteForm/NoteForm";
import { AddTagForm } from "./components/AddTagForm/AddTagForm";
import { GroupsPanel } from "./components/GroupsPanel/GroupsPanel";
import { NotesList } from "./components/NotesList/NotesList";
import { useDispatch, useSelector } from "react-redux";
import { SelectorNotes } from "./store/notes/selectors";
import { getFilterNotesList, updateNoteToForm } from "./store/notes/slice";
import { initialDataForm } from "./constans";
import { TagsContainer } from "./components/TagsContainer/TagsConatiner";

const App = () => {
  const [openPopupWithNoteForm, setOpenPopupWithNoteForm] =
    useState<boolean>(false);

  const dispatch = useDispatch();
  const notesList = useSelector(SelectorNotes.notesList);
  const noteToForm = useSelector(SelectorNotes.noteToForm);
  const handleToggleOpenPopupWithNoteForm = (item?: NoteItemProps) => {
    if (item) {
      dispatch(updateNoteToForm(item));
    }

    setOpenPopupWithNoteForm((openValue) => !openValue);
  };

  return (
    <div className="App">
      <Popup
        open={openPopupWithNoteForm}
        title={noteToForm.id === 0 ? "Создание" : "Редактирование"}
        closePopup={() => handleToggleOpenPopupWithNoteForm()}
      >
        <NoteForm closePopup={() => handleToggleOpenPopupWithNoteForm()} />
      </Popup>

      <div className={"Page"}>
        <GroupsPanel />

        <div className={"NotesListWrapper"}>
          <div className={"InteractiveElementWrapper"}>
            <button
              className={"AddNoteButton"}
              onClick={() => handleToggleOpenPopupWithNoteForm(initialDataForm)}
            >
              Добавить
            </button>

            <TagsContainer />
          </div>
          <div>
            {notesList.length ? (
              <NotesList
                handleToggleOpenPopupWithNoteForm={
                  handleToggleOpenPopupWithNoteForm
                }
              />
            ) : (
              <span>Ничего не добавлено</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
