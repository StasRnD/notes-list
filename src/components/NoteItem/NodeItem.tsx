import React from "react";
import { State } from "../../App";

interface NodeItemProps {
  item: State;
  onClick: VoidFunction;
  onClickDeleteButton: VoidFunction;
}

export const NodeItem: React.FC<NodeItemProps> = ({
  item: { title, description, list },
  onClick,
  onClickDeleteButton,
}) => {
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
          onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
            evt.stopPropagation();
            onClickDeleteButton();
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
