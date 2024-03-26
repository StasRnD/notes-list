import React from "react";
import { NoteItemProps } from "../../types";
import { updateNotes } from "../../utils";
import { produce } from "immer";

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
    const nextState = produce(notes, (draftState) => {
      draftState[item.id - 1].groups[name] = !item.groups[name];
    });
    updateNotes({ notes: nextState, setNotes });
  };

  const handleDeleteNote = (
    event: React.MouseEvent<HTMLImageElement>,
    name: keyof NoteItemProps["groups"],
  ) => {
    event.stopPropagation();
    if (name === "isTrust" && item.groups.isTrust) {
      deleteNoteItem();
      return;
    }
    updateGroupInItem(name);
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
            onClick={(event) => handleDeleteNote(event, "isTrust")}
          />
          <img
            src={"favorite.svg"}
            className={`ActionImage ${item.groups.isFavorite ? "ActiveImage" : ""}`}
            alt={"Избранное"}
            onClick={(event: React.MouseEvent<HTMLImageElement>) =>
              handleDeleteNote(event, "isFavorite")
            }
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
