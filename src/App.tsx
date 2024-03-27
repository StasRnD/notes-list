import React, { useState } from "react";
import "./index.css";
import { Tag } from "./components/Tag/Tag";
import { NoteItemProps, FilterSetting, TagProps } from "./types";
import { Popup } from "./components/Popup/Popup";
import { NoteForm } from "./components/NoteForm/NoteForm";
import { AddTagForm } from "./components/AddTagForm/AddTagForm";
import { produce } from "immer";
import { GroupsPanel } from "./components/GroupsPanel/GroupsPanel";
import { NotesList } from "./components/NotesList/NotesList";

const initialDataForm: NoteItemProps = {
  title: "",
  description: "",
  tags: {},
  groups: {
    isFavorite: false,
    isTrust: false,
  },

  list: [],
  id: 0,
};

const initialNotes: NoteItemProps[] = JSON.parse(
  localStorage.getItem("notes") || `[]`,
);

const globalInitialTagsJson =
  '[{"text":"shopping","color":"#a171d2"},{"text":"business","color":"#e088d2"},{"text":"all other","color":"#eeaa79"}]';

const initialTags: TagProps[] = JSON.parse(
  localStorage.getItem("tags") || globalInitialTagsJson,
);

const initialFilterTags = initialTags.reduce(
  (acc, tag) => {
    return { ...acc, [tag.text]: false };
  },
  {} as NoteItemProps["tags"],
);

const initialFilter: FilterSetting = {
  tags: initialFilterTags,
  groups: null,
};

const App = () => {
  const [openPopupWithNoteForm, setOpenPopupWithNoteForm] =
    useState<boolean>(false);
  const [openPopupWithAddTagForm, setOpenPopupWithAddTagForm] =
    useState<boolean>(false);
  const [dataForm, setDataForm] = useState<NoteItemProps>(initialDataForm);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterSetting, setFilterSetting] =
    useState<FilterSetting>(initialFilter);
  const [notes, setNotes] = useState<NoteItemProps[]>(initialNotes);
  const [tags, setTags] = useState<TagProps[]>(initialTags);
  const handleToggleOpenPopupWithNoteForm = (item?: NoteItemProps) => {
    if (item) {
      setDataForm(() => item);
    }

    setOpenPopupWithNoteForm((openValue) => !openValue);
  };

  const handleToggleOpenPopupWithAddForm = () => {
    setOpenPopupWithAddTagForm((openValue) => !openValue);
  };

  const handleChangeFilterSettingToTags = (
    name: keyof FilterSetting["tags"],
  ) => {
    const updateFilterSetting = produce(filterSetting, (draftState) => {
      draftState.tags[name] = !filterSetting.tags[name];
    });
    setFilterSetting(updateFilterSetting);
  };

  const handleChangeFilterSettingToGroups = (name: FilterSetting["groups"]) => {
    setFilterSetting((oldValue) => {
      return {
        ...oldValue,
        groups: name,
      };
    });
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
          title={dataForm.id === 0 ? "Создание" : "Редактирование"}
          closePopup={() => handleToggleOpenPopupWithNoteForm(initialDataForm)}
        >
          <NoteForm
            item={dataForm}
            notes={notes}
            setNotes={setNotes}
            closePopup={() =>
              handleToggleOpenPopupWithNoteForm(initialDataForm)
            }
            tags={tags}
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
            tags={tags}
            toggleOpenPopupWithAddForm={handleToggleOpenPopupWithAddForm}
            setTags={setTags}
          />
        </Popup>
      )}

      <div className={"Page"}>
        <GroupsPanel
          searchValue={searchValue}
          handleChangeSearchInput={handleChangeSearchInput}
          filterGroups={filterSetting.groups}
          handleChangeFilterSettingToGroups={handleChangeFilterSettingToGroups}
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
              {tags.map((tag) => {
                return (
                  <Tag
                    active={filterSetting.tags[tag.text]}
                    text={tag.text}
                    onClick={() => handleChangeFilterSettingToTags(tag.text)}
                    style={{ background: `${tag.color}` }}
                  />
                );
              })}
            </div>
          </div>
          <div>
            {notes.length ? (
              <NotesList
                notes={notes}
                setNotes={setNotes}
                searchValue={searchValue}
                filterSetting={filterSetting}
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
