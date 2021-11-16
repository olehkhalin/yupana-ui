import React from 'react';

import { Modal } from 'components/ui/Modal';
import { ReactComponent as TempleWallet } from 'svg/TempleWallet.svg';
import { ReactComponent as Beacon } from 'svg/Beacon.svg';

import s from 'components/common/Popups/ConnectToWallet/ConnectToWallet.module.sass';

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
          <TempleWallet />
          <p>Temple wallet</p>
        </div>
        <div className={s.wallet}>
          <Beacon />
          <p>Beacon</p>
        </div>
      </div>
    </div>
  </Modal>
);
