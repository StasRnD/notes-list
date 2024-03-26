import React, { PropsWithChildren, useRef } from "react";

import { useOutsideClickPopup } from "../../hooks";

interface PopupProps {
  closePopup: VoidFunction;
  title: string;
}

export const Popup: React.FC<PropsWithChildren<PopupProps>> = ({
  closePopup,
  children,
  title,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Элемент для навешивание события клика вне Popup
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClickPopup(ref, containerRef, closePopup);

  return (
    <div className={"PopupContainer"} ref={containerRef}>
      <div className={"Overlay"}></div>
      <div className={"Popup"} ref={ref}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
};
