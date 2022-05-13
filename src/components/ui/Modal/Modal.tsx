import React, { FC, useMemo, useCallback } from "react";
import ReactModal from "react-modal";
import cx from "classnames";

import { events } from "constants/analytics";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useAnalytics } from "hooks/useAnalytics";
import { Button } from "components/ui/Button";
import { ReactComponent as Close } from "svg/Close.svg";

import s from "./Modal.module.sass";

ReactModal.setAppElement("#root");

export enum ModalType {
  ACCOUNT = AnalyticsEventCategory.ACCOUNT_POPUP,
  CONNECT_WALLET = AnalyticsEventCategory.CONNECT_WALLET_POPUP,
  SUPPLY = AnalyticsEventCategory.SUPPLY,
  WITHDRAW = AnalyticsEventCategory.WITHDRAW,
  BORROW = AnalyticsEventCategory.BORROW,
  REPAY = AnalyticsEventCategory.REPAY,
}

export type ModalProps = {
  theme?: keyof typeof themeClasses;
  type?: ModalType;
  innerClassName?: string;
} & ReactModal.Props;

const themeClasses = {
  primary: s.primary,
  secondary: s.secondary,
};

export const Modal: FC<ModalProps> = ({
  theme = "primary",
  type,
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

  // Analytics track
  const getEvent = useMemo(() => {
    if (type === ModalType.ACCOUNT) {
      return events.account_popup.close_account_popup;
    } else if (type === ModalType.CONNECT_WALLET) {
      return events.connect_wallet.close_connect_wallet_popup;
    } else if (type) {
      return events.credit_process_modal.close_popup;
    }
    return events.account_popup.close_account_popup;
  }, [type]);

  const trackPopupClosing = useCallback(() => {
    if (type) {
      trackEvent(getEvent, type as unknown as AnalyticsEventCategory);
    }
  }, [getEvent, trackEvent, type]);
  //

  const handleClosePopup = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget && onRequestClose) {
        onRequestClose(e);

        // Analytics track
        trackPopupClosing();
      }
    },
    [onRequestClose, trackPopupClosing]
  );

  const handleClosePopupByIcon = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      onRequestClose?.(e);

      // Analytics track
      trackPopupClosing();
    },
    [onRequestClose, trackPopupClosing]
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
