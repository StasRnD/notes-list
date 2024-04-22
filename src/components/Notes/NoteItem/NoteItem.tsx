import React from "react";
import { NoteItemProps } from "../../../types";

interface NoteItemComponentProps {
  item: NoteItemProps;
  onClick: VoidFunction;
  handleToggleGroupItem: (
    event: React.MouseEvent<HTMLImageElement>,
    name: keyof NoteItemProps["groups"],
    item: NoteItemProps,
  ) => void;
}

export const NoteItemComponent: React.FC<NoteItemComponentProps> = ({
  item,
  onClick,
  handleToggleGroupItem,
}) => {
  const { title, description, list } = item;

  return (
    <div className={"NoteItem"} onClick={onClick}>
      <div className={"HeaderAndActionElement"}>
        <h3>{title}</h3>
        <div className={"ActionElements"}>
          <img
            src={"basket.svg"}
            className={`ActionImage ${item.groups.isTrust ? "ActiveImage" : ""}`}
            alt={"Корзина"}
            onClick={(event) => handleToggleGroupItem(event, "isTrust", item)}
          />
          <img
            src={"favorite.svg"}
            className={`ActionImage ${item.groups.isFavorite ? "ActiveImage" : ""}`}
            alt={"Избранное"}
            onClick={(event) =>
              handleToggleGroupItem(event, "isFavorite", item)
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
