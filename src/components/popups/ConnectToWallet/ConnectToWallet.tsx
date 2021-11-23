import React from 'react';

import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ReactComponent as TempleWallet } from 'svg/TempleWallet.svg';
import { ReactComponent as Beacon } from 'svg/Beacon.svg';
import { ModalHeader } from '../components/ModalHeader';

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
    <ModalHeader
      title={title}
      description={description}
      className={s.head}
    />
    <div className={s.wallets}>
      <Button
        theme="clear"
        className={s.button}
      >
        <TempleWallet />
        <p className={s.walletName}>
          Temple wallet
        </p>
      </Button>
      <Button
        theme="clear"
        className={s.button}
      >
        <Beacon />
        <p className={s.walletName}>
          Beacon
        </p>
      </Button>
    </div>
  </Modal>
);
