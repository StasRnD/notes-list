import React, { MutableRefObject, useRef } from "react";
import { Draggable } from "react-beautiful-dnd";

interface TagProps {
  text: string;
  onClick?: VoidFunction;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id: number;
}

export const Tag: React.FC<TagProps> = ({
  onClick,
  active,
  className,
  text,
  id,
  style,
}) => {
  const blockRef: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  return (
    <Draggable key={id} draggableId={text} index={id}>
      {(provided) => {
        return (
          <div
            ref={(el) => {
              provided.innerRef(el);
              blockRef.current = el;
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              onClick={onClick}
              className={`Tag ${active ? "active" : ""} ${className || ""}`}
              style={style}
            >
              {text}
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
