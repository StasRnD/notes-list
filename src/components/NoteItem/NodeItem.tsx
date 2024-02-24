import React from "react";
import { NoteItem } from "../types";
import { updateNotes } from "../../utils";

interface NodeItemProps {
  item: NoteItem;
  onClick: VoidFunction;
  onClickDeleteButton: VoidFunction;
  setNotes: React.Dispatch<React.SetStateAction<NoteItem[]>>;
  notes: NoteItem[];
}

export const NodeItem: React.FC<NodeItemProps> = ({
  item,
  onClick,
  onClickDeleteButton,
  setNotes,
  notes,
}) => {
  const { title, description, list } = item;

  const updateGroupInItem = (name: keyof NoteItem["groups"]) => {
    const updateItem = {
      ...item,
      groups: {
        ...item.groups,
        [name]: !item.groups[name],
      },
    };

    const notesWithUpdateItem = notes.map((note) => {
      if (note.id === item.id) {
        return updateItem;
      }
      return note;
    });

    updateNotes({ notes: notesWithUpdateItem, setNotes });
  };

  return (
    <div className={"NodeItem"} onClick={onClick}>
      <div className={"Content"}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        {list && (
          <ul>
            {list.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
        )}
        <button
          style={{ opacity: `${item.groups.isTrust ? 0.5 : 1}` }}
          onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
            evt.stopPropagation();
            if (item.groups.isTrust) {
              onClickDeleteButton();
              return;
            }
            updateGroupInItem("isTrust");
          }}
        >
          Удалить
        </button>
        <button
          style={{ opacity: `${item.groups.isFavorite ? 0.5 : 1}` }}
          onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
            evt.stopPropagation();
            updateGroupInItem("isFavorite");
          }}
        >
          Избранное
        </button>
      </div>
    </div>
  );
};
