import React from "react";

interface TagProps {
  styleVariant: "shopping" | "business" | "other";
  text: string;
  onClick?: VoidFunction;
  active?: boolean;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  styleVariant,
  onClick,
  active,
  className,
  text,
}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={`Tag ${styleVariant} ${active ? "active" : ""} ${className || ""}`}
    >
      {text}
    </button>
  );
};
