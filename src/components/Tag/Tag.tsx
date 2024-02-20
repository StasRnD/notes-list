import React from "react";

interface TagProps {
  variant: "shopping" | "business" | "all other";
  onClick?: VoidFunction;
  active?: boolean;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  variant,
  onClick,
  active,
  className,
}) => {
  return (
    <button
      type={"button"}
      onClick={onClick}
      className={`Tag ${variant} ${active ? "active" : ""} ${className}`}
    >
      {variant}
    </button>
  );
};
