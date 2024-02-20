import React, { useEffect, useState } from "react";
import "./index.css";
import { Dialog } from "./components/Dialog/Dialog";
import { NodeItem } from "./components/NoteItem/NodeItem";
import { Tag } from "./components/Tag/Tag";
import { filterByTags } from "./components/utils";

const initialState: State = {
  title: "",
  description: "",
  tags: {
    isBus: false,
    isShop: false,
    isOther: false,
  },

  list: [],
  id: 0,
};

export interface State {
  title: string;
  description: string;
  tags: {
    isBus: boolean;
    isShop: boolean;
    isOther: boolean;
  };

  list: string[];
  id: number;
}

export interface FilterSettingProps {
  isBus: boolean;
  isShop: boolean;
  isOther: boolean;
}

const App = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [visItem, setVisItem] = useState<State>(initialState);
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterSetting, setFilterSetting] = useState<FilterSettingProps>({
    isBus: false,
    isShop: false,
    isOther: false,
  });
  const a = localStorage.getItem("notes");
  const [arrayNotesList, setArrayNotesList] = useState<State[]>([]);

  useEffect(() => {
    const json = localStorage.getItem("notes");
    setArrayNotesList(() => (json ? JSON.parse(json) : []));
  }, [a]);

  const handleToggleOpen = (item: State) => {
    setOpen((old) => !old);
    setVisItem(() => item);
  };

  const handleChangeFilterSetting = (name: keyof FilterSettingProps) => {
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
    const newArray = arrayNotesList.filter((item) => {
      return item.id !== id;
    });

    setArrayNotesList(newArray);

    if (arrayNotesList.length === 1) {
      localStorage.removeItem("notes");
    } else {
      localStorage.setItem("notes", JSON.stringify(newArray, null, 1));
    }
  };

  return (
    <div className="App">
      {open && (
        <Dialog
          toggleOpen={() => handleToggleOpen(initialState)}
          item={visItem}
        />
      )}
      <button onClick={() => setOpen((old) => !old)}>открыть</button>
      <input value={searchValue} onChange={handleChangeSearchInput} />
      <div>
        <Tag
          variant={"business"}
          onClick={() => handleChangeFilterSetting("isBus")}
        />
        <Tag
          variant={"shopping"}
          onClick={() => handleChangeFilterSetting("isShop")}
        />
        <Tag
          variant={"all other"}
          onClick={() => handleChangeFilterSetting("isOther")}
        />
      </div>
      <div>
        {arrayNotesList ? (
          <ul>
            {arrayNotesList
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
