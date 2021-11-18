import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ReactComponent as TempleWallet } from 'svg/TempleWallet.svg';
import { ReactComponent as Beacon } from 'svg/Beacon.svg';

import s from './ConnectToWallet.module.sass';

type ConnectToWalletProps = {
  title: string
  description: string
  isOpen: boolean
  onRequestClose: () => void
};

export const ConnectToWallet: React.FC<ConnectToWalletProps> = ({
  title,
  description,
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    innerClassName={s.inner}
  >
    <div className={s.root}>
      <h2 className={s.title}>
        {title}
      </h2>
      <div className={s.description}>
        {description}
      </div>
      <div className={s.wallets}>
        <div className={s.wallet}>
          <Button
            theme="clear"
            className={s.button}
          >
            <TempleWallet />
            <p className={s.walletName}>Temple wallet</p>
          </Button>
        </div>
        <div className={s.wallet}>
          <Button
            theme="clear"
            className={s.button}
          >
            <Beacon />
            <p className={s.walletName}>Beacon</p>
          </Button>
        </div>
      </div>
    </div>
  </Modal>
);
