import React from "react";
import { groupsButton } from "../../constans";
import { useDispatch, useSelector } from "react-redux";
import { SelectorSearch } from "../../store/search/selectors";
import { changeSearchValue } from "../../store/search/slice";
import { SelectorsGroup } from "../../store/groups/selectors";
import { updateActiveGroup } from "../../store/groups/slice";

export const GroupsPanel: React.FC = () => {
  const dispatch = useDispatch();
  const activeGroup = useSelector(SelectorsGroup.activeGroup);
  const searchValue = useSelector(SelectorSearch.searchValue);
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
        console.log(activeGroup);
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
