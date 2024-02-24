import React, { useEffect, useState } from "react";
import "./index.css";
import { Dialog } from "./components/Dialog/Dialog";
import { NodeItem } from "./components/NoteItem/NodeItem";
import { Tag } from "./components/Tag/Tag";
import { filterByTags } from "./components/utils";
import { updateNotes } from "./utils";
import { NoteItem, FilterSetting } from "./components/types";

const initialItemForForm: NoteItem = {
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
  const [itemForForm, setItemForForm] = useState<NoteItem>(initialItemForForm);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterSetting, setFilterSetting] =
    useState<FilterSetting>(initialFilter);

  const [notes, setNotes] = useState<NoteItem[]>([]);

  useEffect(() => {
    const json = localStorage.getItem("notes");
    if (json !== null) {
      updateNotes({ notes: JSON.parse(json), setNotes });
    }
  }, []);

  const handleToggleOpen = (item: NoteItem) => {
    setItemForForm(() => item);
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

  return (
    <div className="App">
      {openDialog && (
        <Dialog
          toggleOpen={() => handleToggleOpen(initialItemForForm)}
          item={itemForForm}
          notes={notes}
          setNotes={setNotes}
        />
      )}
      <button onClick={() => handleChangeFilterSettingToGroups(null)}>
        all
      </button>
      <button onClick={() => handleChangeFilterSettingToGroups("isFavorite")}>
        избранное
      </button>
      <button onClick={() => handleChangeFilterSettingToGroups("isTrust")}>
        удаленное
      </button>

      <button onClick={() => setOpenDialog((openValue) => !openValue)}>
        открыть
      </button>
      <input value={searchValue} onChange={handleChangeSearchInput} />
      <div>
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
      <div>
        {notes.length ? (
          <ul>
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
                  <NodeItem
                    onClick={() => handleToggleOpen(item)}
                    item={item}
                    onClickDeleteButton={() => deleteNote(item.id)}
                    setNotes={setNotes}
                    notes={notes}
                  />
                );
              })}
          </ul>
        ) : (
          <span>Ничего не добавлено</span>
        )}
      </div>
    </div>
  );
};

export default App;
