import React from "react";
import { groupsButton } from "../../constans";
import { useDispatch, useSelector } from "react-redux";
import { SelectorNotes } from "../../store/notes/selectors";
import { changeSearchValue, updateActiveGroup } from "../../store/notes/slice";

export const GroupsPanel: React.FC = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector(SelectorNotes.searchValue);
  const activeGroup = useSelector(SelectorNotes.activeGroup);
  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(changeSearchValue(event.target.value));
  };

  return (
    <div className={"SearchAndGroupWrapper"}>
      <input
        className={"SearchInput"}
        value={searchValue}
        onChange={handleChangeInputValue}
        placeholder={"Поиск..."}
      />
      {groupsButton.map(({ text, flag }) => {
        return (
          <button
            className={`GroupItem ${activeGroup === flag ? "ActiveGroupItem" : ""}`}
            onClick={() => dispatch(updateActiveGroup(flag))}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};
