import React, { PropsWithChildren, useRef } from "react";
import { Popper, ClickAwayListener } from "@mui/base";

import { useOutsideClickPopup } from "../../hooks";

interface PopupProps {
  closePopup: VoidFunction;
  title: string;
  open: boolean;
}

export const Popup: React.FC<PropsWithChildren<PopupProps>> = ({
  closePopup,
  children,
  title,
  open,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Элемент для навешивание события клика вне Popup
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClickPopup(ref, containerRef, closePopup);

  return (
    <Popper open={open} className={"PopupContainer"} ref={containerRef}>
      <div className={"Overlay"}></div>
      <ClickAwayListener onClickAway={closePopup}>
        <div className={"Popup"} ref={ref}>
          <h3>{title}</h3>
          {children}
        </div>
      </ClickAwayListener>
    </Popper>
  );
};
