import React from 'react';

import { INSTALL_TEMPLE_WALLET } from 'constants/default';
import { useConnectModalsState } from 'hooks/useConnectModalsState';
import { Modal } from 'components/ui/Modal';
import { Button } from 'components/ui/Button';
import { ModalHeader } from 'components/common/ModalHeader';
import { ReactComponent as TempleWallet } from 'svg/TempleWallet.svg';

import s from './InstallWalletModal.module.sass';

export const InstallWalletModal: React.FC = () => {
  const {
    installTempleWalletModalOpen,
    closeInstallTempleWalletModal,
  } = useConnectModalsState();

  return (
    <Modal
      isOpen={installTempleWalletModalOpen}
      onRequestClose={closeInstallTempleWalletModal}
    >
      <ModalHeader
        title="Install a wallet"
        description="Please install a wallet to access the project:"
        className={s.header}
      />
      <Button
        theme="clear"
        href={INSTALL_TEMPLE_WALLET}
        external
        className={s.button}
      >
        <TempleWallet className={s.icon} />
        Temple wallet
      </Button>
    </Modal>
  );
};
