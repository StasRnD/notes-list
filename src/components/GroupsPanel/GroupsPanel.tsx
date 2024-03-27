import React from "react";
import { FilterSetting } from "../../types";

interface GroupsPanelProps {
  filterGroups: FilterSetting["groups"];
  handleChangeFilterSettingToGroups: (name: FilterSetting["groups"]) => void;
  searchValue: string;
  handleChangeSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface GroupsButtonProps {
  text: string;
  flag: FilterSetting["groups"];
}

const groupsButton: GroupsButtonProps[] = [
  {
    text: "Все заметки",
    flag: null,
  },
  {
    text: "Избранное",
    flag: "isFavorite",
  },
  {
    text: "Корзина",
    flag: "isTrust",
  },
];
export const GroupsPanel: React.FC<GroupsPanelProps> = ({
  filterGroups,
  handleChangeSearchInput,
  searchValue,
  handleChangeFilterSettingToGroups,
}) => {
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
            onClick={() => handleChangeFilterSettingToGroups(flag)}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};
