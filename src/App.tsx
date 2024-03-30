import React, { useState } from "react";
import "./index.css";
import { Tag } from "./components/Tag/Tag";
import { NoteItemProps } from "./types";
import { Popup } from "./components/Popup/Popup";
import { NoteForm } from "./components/NoteForm/NoteForm";
import { AddTagForm } from "./components/AddTagForm/AddTagForm";
import { GroupsPanel } from "./components/GroupsPanel/GroupsPanel";
import { NotesList } from "./components/NotesList/NotesList";
import { useDispatch, useSelector } from "react-redux";
import { SelectorNotes } from "./store/notes/selectors";
import { SelectorTags } from "./store/tags/selectors";
import {
  updateNoteToForm,
  updateTagForFilterSetting,
} from "./store/notes/slice";
import { initialDataForm } from "./constans";

const App = () => {
  const [openPopupWithNoteForm, setOpenPopupWithNoteForm] =
    useState<boolean>(false);
  const [openPopupWithAddTagForm, setOpenPopupWithAddTagForm] =
    useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useDispatch();
  const notesList = useSelector(SelectorNotes.notesList);
  const tagsList = useSelector(SelectorTags.tagsList);
  const noteToForm = useSelector(SelectorNotes.noteToForm);
  const filterSetting = useSelector(SelectorNotes.filterSetting);
  const handleToggleOpenPopupWithNoteForm = (item?: NoteItemProps) => {
    if (item) {
      dispatch(updateNoteToForm(item));
    }

    setOpenPopupWithNoteForm((openValue) => !openValue);
  };

  const handleToggleOpenPopupWithAddForm = () => {
    setOpenPopupWithAddTagForm((openValue) => !openValue);
  };

  const handleChangeSearchInput = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchValue(evt.target.value);
  };

  return (
    <div className="App">
      {openPopupWithNoteForm && (
        <Popup
          title={noteToForm.id === 0 ? "Создание" : "Редактирование"}
          closePopup={() => handleToggleOpenPopupWithNoteForm(initialDataForm)}
        >
          <NoteForm
            closePopup={() =>
              handleToggleOpenPopupWithNoteForm(initialDataForm)
            }
            handleOpenAddTagForm={handleToggleOpenPopupWithAddForm}
          />
        </Popup>
      )}
      {openPopupWithAddTagForm && (
        <Popup
          title={"Добавить тег"}
          closePopup={handleToggleOpenPopupWithAddForm}
        >
          <AddTagForm
            toggleOpenPopupWithAddForm={handleToggleOpenPopupWithAddForm}
          />
        </Popup>
      )}

      <div className={"Page"}>
        <GroupsPanel
          searchValue={searchValue}
          handleChangeSearchInput={handleChangeSearchInput}
        />

        <div className={"NotesListWrapper"}>
          <div className={"InteractiveElementWrapper"}>
            <button
              className={"AddNoteButton"}
              onClick={() => handleToggleOpenPopupWithNoteForm()}
            >
              Добавить
            </button>

            <div className={"TagContainer"}>
              {tagsList.map((tag) => {
                return (
                  <Tag
                    active={filterSetting.tags[tag.text]}
                    text={tag.text}
                    onClick={() =>
                      dispatch(updateTagForFilterSetting(tag.text))
                    }
                    style={{ background: `${tag.color}` }}
                  />
                );
              })}
            </div>
          </div>
          <div>
            {notesList.length ? (
              <NotesList
                searchValue={searchValue}
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
