import React, { useEffect, useState } from "react";
import "./index.css";
import { Dialog } from "./components/Dialog/Dialog";
import { NodeItem } from "./components/NoteItem/NodeItem";
import { Tag } from "./components/Tag/Tag";
import { filterByTags } from "./components/utils";
import { updateNotes } from "./utils";
import { NoteItem } from "./components/types";

const initialItemForForm: NoteItem = {
  title: "",
  description: "",
  tags: {
    isBusiness: false,
    isShopping: false,
    isOther: false,
  },

  list: [],
  id: 0,
};

const App = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [itemForForm, setItemForForm] = useState<NoteItem>(initialItemForForm);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterSetting, setFilterSetting] = useState<NoteItem["tags"]>({
    isBusiness: false,
    isShopping: false,
    isOther: false,
  });
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

  const handleChangeFilterSetting = (name: keyof NoteItem["tags"]) => {
    setFilterSetting((oldValue) => {
      return {
        ...oldValue,
        [name]: !oldValue[name],
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
      <button onClick={() => setOpenDialog((openValue) => !openValue)}>
        открыть
      </button>
      <input value={searchValue} onChange={handleChangeSearchInput} />
      <div>
        <Tag
          active={filterSetting.isBusiness}
          variant={"business"}
          onClick={() => handleChangeFilterSetting("isBusiness")}
        />
        <Tag
          active={filterSetting.isShopping}
          variant={"shopping"}
          onClick={() => handleChangeFilterSetting("isShopping")}
        />
        <Tag
          variant={"all other"}
          active={filterSetting.isOther}
          onClick={() => handleChangeFilterSetting("isOther")}
        />
      </div>
      <div>
        {notes ? (
          <ul>
            {notes
              .filter((item) => {
                return filterByTags(item, filterSetting);
              })
              .filter((item) => {
                return item.title.includes(searchValue);
              })
              .map((item) => {
                return (
                  <NodeItem
                    onClick={() => handleToggleOpen(item)}
                    item={item}
                    onClickDeleteButton={() => deleteNote(item.id)}
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
