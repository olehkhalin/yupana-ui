import React, { FC } from "react";
import ReactModal from "react-modal";
import cx from "classnames";

import { Button } from "components/ui/Button";
import { ReactComponent as Close } from "svg/Close.svg";

import s from "./Modal.module.sass";
import { useAnalytics } from "hooks/useAnalytics";
import { events } from "constants/analytics";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useCallback } from "react";

ReactModal.setAppElement("#root");

export type ModalProps = {
  theme?: keyof typeof themeClasses;
  trackModalClosing?: boolean;
  innerClassName?: string;
} & ReactModal.Props;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Modal: FC<ModalProps> = ({
  theme = "primary",
  trackModalClosing = false,
  className,
  overlayClassName,
  portalClassName,
  isOpen,
  onRequestClose,
  children,
  innerClassName,
  ...props
}) => {
  const { trackEvent } = useAnalytics();

  const handleClosePopup = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget && onRequestClose) {
        onRequestClose(e);
        if (trackModalClosing) {
          trackEvent(
            events.connect_wallet.close_popup,
            AnalyticsEventCategory.CONNECT_WALLET_POPUP
          );
        }
      }
    },
    [onRequestClose, trackEvent, trackModalClosing]
  );

  const handleClosePopupByIcon = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onRequestClose?.(e);
      if (trackModalClosing) {
        trackEvent(
          events.connect_wallet.close_popup,
          AnalyticsEventCategory.CONNECT_WALLET_POPUP
        );
      }
    },
    [onRequestClose, trackEvent, trackModalClosing]
  );

  return (
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
      <div className={s.wrapper} onClick={(e) => handleClosePopup(e)}>
        <div className={cx(s.inner, innerClassName)}>
          <Button
            className={cx(s.closeButton, themeClasses[theme])}
            theme="clear"
            onClick={(e: any) => handleClosePopupByIcon(e)}
          >
            <Close className={s.closeIcon} />
          </Button>
          {children}
        </div>
      </div>
    </ReactModal>
  );
};
