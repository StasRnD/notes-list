import React, { useState } from "react";
import "./index.css";
import { NoteItemComponent } from "./components/NoteItem/NoteItem";
import { Tag } from "./components/Tag/Tag";
import { updateNotes, filterByTags } from "./utils";
import { NoteItemProps, FilterSetting, TagProps } from "./types";
import { Popup } from "./components/Popup/Popup";
import { NoteForm } from "./components/NoteForm/NoteForm";
import { AddTagForm } from "./components/AddTagForm/AddTagForm";
import { produce } from "immer";

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
  const handleToggleOpenPopup = (item?: NoteItemProps) => {
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

  const deleteNote = (id: number) => {
    const newArray = notes.filter((item) => {
      return item.id !== id;
    });

    updateNotes({ notes: newArray, setNotes });
  };

  const getFilterNotes = () => {
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

    return (
      <ul className={"NotesList"}>
        {filterNotes.length > 0 ? (
          filterNotes.map((item) => {
            return (
              <NoteItemComponent
                onClick={() => handleToggleOpenPopup(item)}
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

  return (
    <div className="App">
      {openPopupWithNoteForm && (
        <Popup
          title={dataForm.id === 0 ? "Создание" : "Редактирование"}
          closePopup={() => handleToggleOpenPopup(initialDataForm)}
        >
          <NoteForm
            item={dataForm}
            notes={notes}
            setNotes={setNotes}
            closePopup={() => handleToggleOpenPopup(initialDataForm)}
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
        <div className={"SearchAndGroupWrapper"}>
          <input
            className={"SearchInput"}
            value={searchValue}
            onChange={handleChangeSearchInput}
            placeholder={"Поиск..."}
          />

          <button
            className={`GroupItem ${filterSetting.groups === null ? "ActiveGroupItem" : ""}`}
            onClick={() => handleChangeFilterSettingToGroups(null)}
          >
            Все заметки
          </button>
          <button
            className={`GroupItem ${filterSetting.groups === "isFavorite" ? "ActiveGroupItem" : ""}`}
            onClick={() => handleChangeFilterSettingToGroups("isFavorite")}
          >
            Избранное
          </button>
          <button
            className={`GroupItem ${filterSetting.groups === "isTrust" ? "ActiveGroupItem" : ""}`}
            onClick={() => handleChangeFilterSettingToGroups("isTrust")}
          >
            Корзина
          </button>
        </div>
        <div className={"NotesListWrapper"}>
          <div className={"InteractiveElementWrapper"}>
            <button
              className={"AddNoteButton"}
              onClick={() => handleToggleOpenPopup()}
            >
              Добавить
            </button>

            <div className={"TagsContainer"}>
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
            {notes.length ? getFilterNotes() : <span>Ничего не добавлено</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
