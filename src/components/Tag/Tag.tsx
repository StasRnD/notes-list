import React from "react";

interface TagProps {
  text: string;
  onClick?: VoidFunction;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const Tag: React.FC<TagProps> = ({
  onClick,
  active,
  className,
  text,
  style,
}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={`Tag ${active ? "active" : ""} ${className || ""}`}
      style={style}
    >
      {text}
    </button>
  );
};
