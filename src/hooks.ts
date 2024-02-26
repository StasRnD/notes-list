import React, { useEffect } from "react";

export function useOutsideClickPopup<T extends HTMLElement>(
  ref: React.RefObject<T>,
  refContainer: React.RefObject<T>,
  handleClick: () => void,
) {
  function handleOutsideClick(event: MouseEvent) {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      handleClick();
    }
  }

  useEffect(() => {
    refContainer.current?.addEventListener("click", handleOutsideClick);

    return () => {
      refContainer.current?.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);
}
