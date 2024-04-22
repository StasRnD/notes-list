import React, { MutableRefObject, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

interface TagProps {
  text: string;
  onClick?: VoidFunction;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  index: number;
}

export const Tag: React.FC<TagProps> = ({
  onClick,
  active,
  className,
  text,
  style,
  index,
}) => {
  return (
    <Draggable key={text} draggableId={text} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          <p
            className={`Tag ${active ? "active" : ""} ${className || ""}`}
            style={{ margin: "10px", ...style }}
          >
            {text}
          </p>
        </div>
      )}
    </Draggable>
  );
};
