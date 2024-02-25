import React from "react";
import { NoteItemProps } from "../../types";
import { updateNotes } from "../../utils";

interface NoteItemComponentProps {
  item: NoteItemProps;
  onClick: VoidFunction;
  deleteNoteItem: VoidFunction;
  setNotes: React.Dispatch<React.SetStateAction<NoteItemProps[]>>;
  notes: NoteItemProps[];
}

export const NoteItemComponent: React.FC<NoteItemComponentProps> = ({
  item,
  onClick,
  deleteNoteItem,
  setNotes,
  notes,
}) => {
  const { title, description, list } = item;

  const updateGroupInItem = (name: keyof NoteItemProps["groups"]) => {
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
    <div className={"NoteItem"} onClick={onClick}>
      <div className={"HeaderAndActionElement"}>
        <h3>{title}</h3>
        <div className={"ActionElements"}>
          <img
            src={"basket.svg"}
            className={`ActionImage ${item.groups.isTrust ? "ActiveImage" : ""}`}
            alt={"Корзина"}
            onClick={(evt: React.MouseEvent<HTMLImageElement>) => {
              evt.stopPropagation();
              if (item.groups.isTrust) {
                deleteNoteItem();
                return;
              }
              updateGroupInItem("isTrust");
            }}
          />
          <img
            src={"favorite.svg"}
            className={`ActionImage ${item.groups.isFavorite ? "ActiveImage" : ""}`}
            alt={"Избранное"}
            onClick={(evt: React.MouseEvent<HTMLImageElement>) => {
              evt.stopPropagation();
              updateGroupInItem("isFavorite");
            }}
          />
        </div>
      </div>
      {description && <p>{description}</p>}

      {list.length > 0 && (
        <ul>
          {list.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      )}
    </div>
  );
};
