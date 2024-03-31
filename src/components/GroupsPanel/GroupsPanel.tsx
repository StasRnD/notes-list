import React from "react";
import { groupsButton } from "../../constans";
import { useDispatch, useSelector } from "react-redux";
import { updateGroupForFilterSetting } from "../../store/notes/slice";
import { SelectorNotes } from "../../store/notes/selectors";

interface GroupsPanelProps {
  searchValue: string;
  handleChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GroupsPanel: React.FC<GroupsPanelProps> = ({
  handleChangeSearchInput,
  searchValue,
}) => {
  const dispatch = useDispatch();
  const filterGroups = useSelector(SelectorNotes.filterSettingGroup);
  return (
    <div className={"SearchAndGroupWrapper"}>
      <input
        className={"SearchInput"}
        value={searchValue}
        onChange={handleChangeSearchInput}
        placeholder={"Поиск..."}
      />
      {groupsButton.map(({ text, flag }) => {
        return (
          <button
            className={`GroupItem ${filterGroups === flag ? "ActiveGroupItem" : ""}`}
            onClick={() => dispatch(updateGroupForFilterSetting(flag))}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};
