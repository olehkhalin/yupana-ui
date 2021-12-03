import React from 'react';

import { ModalActions } from 'types/modal';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/common/ModalHeader';
import { ReactComponent as TempleWallet } from 'svg/TempleWallet.svg';
import { ReactComponent as Beacon } from 'svg/Beacon.svg';

import s from './ConnectToWalletModal.module.sass';

export const ConnectToWalletModal: React.FC<ModalActions> = ({
  title,
  description,
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    <ModalHeader
      title={title}
      description={description}
      className={s.root}
    />
    <div className={s.wallets}>
      <Button
        theme="clear"
        className={s.button}
      >
        <TempleWallet className={s.icon} />
        Temple wallet
      </Button>
      <Button
        theme="clear"
        className={s.button}
      >
        <Beacon className={s.icon} />
        Beacon
      </Button>
    </div>
  </Modal>
);
