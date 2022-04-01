import React, { useState, useCallback, FC } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cx from "classnames";

import { EXPLORER_URL } from "constants/defaults";
import { useWiderThanMphone } from "utils/helpers";
import { useDisconnect } from "utils/dapp";
import { ModalActions } from "types/modal";
import { useAnalytics } from "hooks/useAnalytics";
import { useTransactions } from "hooks/useTransactions";
import { Modal } from "components/ui/Modal";
import { Button } from "components/ui/Button";
import { ModalHeader } from "components/ui/Modal/ModalHeader";
import { ReactComponent as IconCopy } from "svg/IconCopy.svg";
import { ReactComponent as IconLink } from "svg/IconLink.svg";
import { ReactComponent as Success } from "svg/Success.svg";

import { TransactionsHistory } from "./TransactionsHistory";
import s from "./AccountModal.module.sass";
import { events } from "constants/analytics";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";

type AccountModalProps = {
  address: string;
} & ModalActions;

export const AccountModal: FC<AccountModalProps> = ({
  address,
  isOpen,
  onRequestClose,
}) => {
  const disconnect = useDisconnect();
  const isWiderThanMphone = useWiderThanMphone();
  const [success, setSuccess] = useState<boolean>(false);
  const { isTransactionsExist } = useTransactions();
  const { trackEvent } = useAnalytics();

  const handleSetSuccessOfCopy = () => {
    if (!success) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);

      trackEvent(
        events.account_popup.copy_address,
        AnalyticsEventCategory.ACCOUNT_POPUP
      );
    }
  };

  const goToExplorer = useCallback(() => {
    trackEvent(
      events.account_popup.explorer,
      AnalyticsEventCategory.ACCOUNT_POPUP
    );
  }, [trackEvent]);

  const handleLogout = useCallback(() => {
    disconnect();
    onRequestClose();
    trackEvent(
      events.account_popup.logout,
      AnalyticsEventCategory.ACCOUNT_POPUP
    );
  }, [disconnect, onRequestClose, trackEvent]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      innerClassName={s.innerModal}
    >
      <ModalHeader
        title="Account"
        description="Connected wallet address:"
        className={s.root}
      />
      <div className={s.address}>{address}</div>
      <div className={s.options}>
        <Button
          theme="clear"
          href={`${EXPLORER_URL}/${address}`}
          onClick={goToExplorer}
          external
          className={s.button}
        >
          View on explorer
          <IconLink className={s.icon} />
        </Button>
        <CopyToClipboard text={address} onCopy={handleSetSuccessOfCopy}>
          <Button theme="clear" className={s.button}>
            Copy address
            <div className={cx(s.iconsWrapper, { [s.success]: success })}>
              <Success className={s.arrow} />
              <IconCopy className={s.clipboard} />
            </div>
          </Button>
        </CopyToClipboard>
      </div>
      <Button theme="clear" onClick={handleLogout} className={s.logout}>
        log out
      </Button>
      {isTransactionsExist && (
        <TransactionsHistory className={s.transactions} />
      )}
    </Modal>
  );
};
