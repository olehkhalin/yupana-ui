import React, { useState, useCallback, FC } from "react";
import cx from "classnames";

import { useWiderThanMphone } from "utils/helpers";
import { shortize } from "utils/helpers";
import { useReady, useAccountPkh } from "utils/dapp";
import { useTransactions } from "hooks/useTransactions";
import { AccountModal } from "components/modals/AccountModal";
import { ConnectWalletModal } from "components/modals/ConnectWalletModal";
import { Button } from "components/ui/Button";

import { TransactionsIcon } from "./TransactionsIcon";
import s from "./ConnectWalletButton.module.sass";

type ConnectWalletButtonProps = {
  className?: string;
};

export const ConnectWalletButton: FC<ConnectWalletButtonProps> = ({
  className,
}) => {
  const isWiderThanMphone = useWiderThanMphone();
  const ready = useReady();
  const accountPkh = useAccountPkh();
  const { isTransactionsExist } = useTransactions();

  const [accountModalIsOpen, setAccountModalIsOpen] = useState<boolean>(false);
  const [connectModalIsOpen, setConnectModalIsOpen] = useState<boolean>(false);

  const handleAccountModal = useCallback(() => {
    setAccountModalIsOpen(!accountModalIsOpen);
  }, [accountModalIsOpen]);

  const handleConnectModal = useCallback(() => {
    setConnectModalIsOpen(!connectModalIsOpen);
  }, [connectModalIsOpen]);

  return (
    <>
      {ready && accountPkh ? (
        <>
          <Button
            sizeT="medium"
            theme="secondary"
            aria-label={accountPkh}
            onClick={handleAccountModal}
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
            onClick={handleConnectModal}
            className={cx(s.button, className)}
          >
            Connect <span className={s.connectDesktop}>wallet</span>
          </Button>
          <ConnectWalletModal
            isOpen={connectModalIsOpen}
            onRequestClose={handleConnectModal}
          />
        </>
      )}
    </>
  );
};
