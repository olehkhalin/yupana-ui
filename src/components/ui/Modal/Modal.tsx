import React from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames';

import { Button } from 'components/ui/Button';
import { ReactComponent as Close } from 'svg/Close.svg';

import s from './Modal.module.sass';

export type ModalProps = {
  innerClassName?: string;
} & ReactModal.Props;

export const Modal: React.FC<ModalProps> = ({
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
          className={s.closeButton}
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
