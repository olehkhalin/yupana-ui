import React, { useState, useCallback } from 'react';
import cx from 'classnames';

import {
  useReady,
  useAccountPkh,
} from 'utils/dapp';

import { useWiderThanMphone } from 'utils/getMediaQuery';
import { shortize } from 'utils/getShortize';
import { Account } from 'components/popups/Account';
import { ConnectToWallet } from 'components/popups/ConnectToWallet';
import { Button } from 'components/ui/Button';

import s from './ConnectWalletButton.module.sass';

type ConnectWalletButtonProps = {
  className?: string;
};

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
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
      {(ready && accountPkh) ? (
        <Button
          sizeT="medium"
          theme="primary"
          aria-label={accountPkh}
          onClick={handleAccountModal}
          className={cx(s.button, className)}
        >
          {shortize(accountPkh, isWiderThanMphone ? 7 : 4)}
        </Button>
      ) : (
        <Button
          sizeT="medium"
          theme="primary"
          onClick={handleConnectModal}
          className={cx(s.button, className)}
        >
          Connect
          {' '}
          <span className={s.connectDesktop}>
            wallet
          </span>
        </Button>
      )}

      <Account
        // TODO: Update later
        address={accountPkh ?? 'account_address'}
        isOpen={accountModalIsOpen}
        onRequestClose={handleAccountModal}
      />

      <ConnectToWallet
        isOpen={connectModalIsOpen}
        onRequestClose={handleConnectModal}
      />
    </>
  );
};
