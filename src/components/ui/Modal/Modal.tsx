import React from "react";
import ReactModal from "react-modal";
import cx from "classnames";

import { Button } from "components/ui/Button";
import { ReactComponent as Close } from "svg/Close.svg";

import s from "./Modal.module.sass";

ReactModal.setAppElement("#root");

export type ModalProps = {
  theme?: keyof typeof themeClasses;
  innerClassName?: string;
} & ReactModal.Props;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Modal: React.FC<ModalProps> = ({
  theme = "primary",
  className,
  overlayClassName,
  portalClassName,
  isOpen,
  onRequestClose,
  children,
  innerClassName,
  ...props
}) => (
  <ReactModal
    className={cx(s.root, className)}
    isOpen={isOpen}
    closeTimeoutMS={0}
    onRequestClose={onRequestClose}
    overlayClassName={cx(s.overlay, overlayClassName)}
    portalClassName={cx(s.portal, { [s.hidden]: !isOpen }, portalClassName)}
    {...props}
  >
    {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
    <div
      className={s.wrapper}
      onClick={(e) => {
        if (e.target === e.currentTarget && onRequestClose) {
          onRequestClose(e);
        }
      }}
    >
      <div className={cx(s.inner, innerClassName)}>
        <Button
          className={cx(s.closeButton, themeClasses[theme])}
          theme="clear"
          onClick={onRequestClose}
        >
          <Close className={s.closeIcon} />
        </Button>
        {children}
      </div>
    </div>
  </ReactModal>
);
