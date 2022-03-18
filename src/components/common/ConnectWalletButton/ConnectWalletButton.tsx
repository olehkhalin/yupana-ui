import React, { FC, useCallback } from "react";
import cx from "classnames";

import { useWiderThanMphone } from "utils/helpers";
import { shortize } from "utils/helpers";
import { useReady, useAccountPkh } from "utils/dapp";
import { useTransactions } from "hooks/useTransactions";
import { useConnectWalletModal } from "hooks/useConnectModal";
import { AccountModal } from "components/modals/AccountModal";
import { ConnectWalletModal } from "components/modals/ConnectWalletModal";
import { InstallWalletModal } from "components/modals/InstallWalletModal";
import { Button, ButtonProps } from "components/ui/Button";

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

  const handleModal = useCallback(
    (callback: () => void) => {
      callback();
      closeAnotherModal?.();
    },
    [closeAnotherModal]
  );

  return (
    <>
      {ready && accountPkh ? (
        <>
          <Button
            sizeT="medium"
            theme="secondary"
            aria-label={accountPkh}
            onClick={() => handleModal(handleAccountModal)}
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
            onClick={() => handleModal(handleConnectModal)}
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
