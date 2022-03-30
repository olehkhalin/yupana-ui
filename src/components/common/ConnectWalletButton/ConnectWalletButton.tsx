import React, { FC, useCallback } from "react";
import cx from "classnames";

import { events } from "constants/analytics";
import { shortize, useWiderThanMphone } from "utils/helpers";
import { useReady, useAccountPkh } from "utils/dapp";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { useTransactions } from "hooks/useTransactions";
import { useAnalytics } from "hooks/useAnalytics";
import { useConnectWalletModal } from "hooks/useConnectModal";
import { Button, ButtonProps } from "components/ui/Button";
import { AccountModal } from "components/modals/AccountModal";
import { ConnectWalletModal } from "components/modals/ConnectWalletModal";
import { InstallWalletModal } from "components/modals/InstallWalletModal";

import { TransactionsIcon } from "./TransactionsIcon";
import s from "./ConnectWalletButton.module.sass";

type ConnectWalletButtonProps = {
  closeAnotherModal?: () => void;
  className?: string;
} & ButtonProps;

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  closeAnotherModal,
  className,
  ...props
}) => {
  const isWiderThanMphone = useWiderThanMphone();
  const ready = useReady();
  const accountPkh = useAccountPkh();
  const { isTransactionsExist } = useTransactions();
  const { handleAccountModal, accountModalIsOpen, handleConnectModal } =
    useConnectWalletModal();
  const { trackEvent } = useAnalytics();

  const handleModal = useCallback(
    (callback: () => void) => {
      callback();
      closeAnotherModal?.();
    },
    [closeAnotherModal]
  );

  const onAccountModal = useCallback(() => {
    handleModal(handleAccountModal);
    trackEvent(
      events.header.wallet.account_popup,
      AnalyticsEventCategory.HEADER
    );
  }, [handleAccountModal, handleModal, trackEvent]);

  const onConnectWalletModal = useCallback(() => {
    handleModal(handleConnectModal);
    trackEvent(
      events.header.wallet.connect_wallet_popup,
      AnalyticsEventCategory.HEADER
    );
  }, [handleConnectModal, handleModal, trackEvent]);

  return (
    <>
      {ready && accountPkh ? (
        <>
          <Button
            sizeT="medium"
            theme="secondary"
            aria-label={accountPkh}
            onClick={onAccountModal}
            className={cx(
              s.button,
              { [s.transactions]: isTransactionsExist },
              className
            )}
          >
            <span className={s.buttonText}>
              {shortize(accountPkh, isWiderThanMphone ? 6 : 4)}
            </span>
            {isTransactionsExist && <TransactionsIcon />}
          </Button>
          <AccountModal
            address={accountPkh}
            isOpen={accountModalIsOpen}
            onRequestClose={handleAccountModal}
          />
        </>
      ) : (
        <>
          <Button
            sizeT="medium"
            theme="primary"
            onClick={onConnectWalletModal}
            className={cx(s.button, className)}
            {...props}
          >
            Connect <span className={s.connectDesktop}>wallet</span>
          </Button>
          <ConnectWalletModal />
          <InstallWalletModal />
        </>
      )}
    </>
  );
};
