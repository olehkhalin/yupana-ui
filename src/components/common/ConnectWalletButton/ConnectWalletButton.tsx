import React, { useState, useCallback, FC } from "react";
import cx from "classnames";

import { useWiderThanMphone } from "utils/helpers";
import { shortize } from "utils/helpers";
import { useReady, useAccountPkh } from "utils/dapp";
import { AccountModal } from "components/modals/AccountModal";
import { ConnectWalletModal } from "components/modals/ConnectWalletModal";
import { Button } from "components/ui/Button";

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
            theme="primary"
            aria-label={accountPkh}
            onClick={handleAccountModal}
            className={cx(s.button, className)}
          >
            {shortize(accountPkh, isWiderThanMphone ? 7 : 4)}
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
