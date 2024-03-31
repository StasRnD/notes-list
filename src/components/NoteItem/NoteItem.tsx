import React from "react";
import { NoteItemProps } from "../../types";
import { useDispatch } from "react-redux";
import { deleteNote, updateGroupInNote } from "../../store/notes/slice";

interface NoteItemComponentProps {
  item: NoteItemProps;
  onClick: VoidFunction;
}

export const NoteItemComponent: React.FC<NoteItemComponentProps> = ({
  item,
  onClick,
}) => {
  const { title, description, list } = item;
  const dispatch = useDispatch();

  const handleToggleGroupItem = (
    event: React.MouseEvent<HTMLImageElement>,
    name: keyof NoteItemProps["groups"],
  ) => {
    event.stopPropagation();
    if (name === "isTrust" && item.groups.isTrust) {
      dispatch(deleteNote(item.id));
      return;
    }
    dispatch(updateGroupInNote({ item, name }));
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
            onClick={(event) => handleToggleGroupItem(event, "isTrust")}
          />
          <img
            src={"favorite.svg"}
            className={`ActionImage ${item.groups.isFavorite ? "ActiveImage" : ""}`}
            alt={"Избранное"}
            onClick={(event) => handleToggleGroupItem(event, "isFavorite")}
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
