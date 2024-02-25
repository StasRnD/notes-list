import React, { useEffect, useState } from "react";
import "./index.css";
import { NoteItemComponent } from "./components/NoteItem/NoteItem";
import { Tag } from "./components/Tag/Tag";
import { filterByTags } from "./components/utils";
import { updateNotes } from "./utils";
import { NoteItemProps, FilterSetting } from "./types";
import { Popup } from "./components/Popup/Popup";

const initialDataForm: NoteItemProps = {
  title: "",
  description: "",
  tags: {
    isBusiness: false,
    isShopping: false,
    isOther: false,
  },
  groups: {
    isFavorite: false,
    isTrust: false,
  },

  list: [],
  id: 0,
};

const initialFilter: FilterSetting = {
  tags: { isBusiness: false, isShopping: false, isOther: false },
  groups: null,
};

const App = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<NoteItemProps>(initialDataForm);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterSetting, setFilterSetting] =
    useState<FilterSetting>(initialFilter);

  const [notes, setNotes] = useState<NoteItemProps[]>([]);

  useEffect(() => {
    const json = localStorage.getItem("notes");
    if (json !== null) {
      updateNotes({ notes: JSON.parse(json), setNotes });
    }
  }, []);

  const handleToggleOpenPopup = (item: NoteItemProps) => {
    setDataForm(() => item);
    setOpenDialog((openValue) => !openValue);
  };

  const handleChangeFilterSettingToTags = (
    name: keyof FilterSetting["tags"],
  ) => {
    setFilterSetting((oldValue) => {
      return {
        ...oldValue,
        tags: {
          ...oldValue.tags,
          [name]: !oldValue.tags[name],
        },
      };
    });
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

  const filterNotes = () => {
    return (
      <ul className={"NotesList"}>
        {notes
          .filter((item) => {
            if (filterSetting.groups === "isTrust") {
              return item.groups.isTrust;
            }
            if (filterSetting.groups === "isFavorite") {
              return item.groups.isFavorite;
            }
            return true;
          })
          .filter((item) => {
            return filterByTags(item, filterSetting.tags);
          })
          .filter((item) => {
            return item.title
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase().trim());
          })
          .map((item) => {
            return (
              <NoteItemComponent
                onClick={() => handleToggleOpenPopup(item)}
                item={item}
                deleteNoteItem={() => deleteNote(item.id)}
                setNotes={setNotes}
                notes={notes}
              />
            );
          })}
      </ul>
    );
  };

  return (
    <div className="App">
      {openDialog && (
        <Popup
          closePopup={() => handleToggleOpenPopup(initialDataForm)}
          item={dataForm}
          notes={notes}
          setNotes={setNotes}
        />
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
              onClick={() => setOpenDialog((openValue) => !openValue)}
            >
              Добавить
            </button>

            <div className={"TagsContainer"}>
              <Tag
                active={filterSetting.tags.isBusiness}
                variant={"business"}
                onClick={() => handleChangeFilterSettingToTags("isBusiness")}
              />
              <Tag
                active={filterSetting.tags.isShopping}
                variant={"shopping"}
                onClick={() => handleChangeFilterSettingToTags("isShopping")}
              />
              <Tag
                variant={"all other"}
                active={filterSetting.tags.isOther}
                onClick={() => handleChangeFilterSettingToTags("isOther")}
              />
            </div>
          </div>
          <div>
            {notes.length ? filterNotes() : <span>Ничего не добавлено</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
