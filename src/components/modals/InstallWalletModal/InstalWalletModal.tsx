import React from 'react';

import { ModalActions } from 'types/modal';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/common/ModalHeader';
import { ReactComponent as TempleWallet } from 'svg/TempleWallet.svg';

import s from './InstallWalletModal.module.sass';

type InstalWalletProps = ModalActions;

export const InstallWalletModal: React.FC<InstalWalletProps> = ({
  isOpen,
  onRequestClose,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    <ModalHeader
      title="Install a wallet"
      description="Please install a wallet to access the project:"
      className={s.header}
    />
    <Button
      theme="clear"
      className={s.button}
    >
      <TempleWallet className={s.icon} />
      Temple wallet
    </Button>
  </Modal>
);
