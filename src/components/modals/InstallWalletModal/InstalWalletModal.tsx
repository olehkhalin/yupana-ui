import React from "react";

import { TEMPLE_WALLET_LINK } from "constants/defaults";
import { useConnectWalletModal } from "hooks/useConnectModal";
import { Modal } from "components/ui/Modal";
import { Button } from "components/ui/Button";
import { ModalHeader } from "components/ui/Modal/ModalHeader";
import { ReactComponent as TempleWallet } from "svg/TempleWallet.svg";

import s from "./InstallWalletModal.module.sass";

export const InstallWalletModal: React.FC = () => {
  const { installTempleWalletModalOpen, handleInstallTempleWalletModal } =
    useConnectWalletModal();

  return (
    <Modal
      isOpen={installTempleWalletModalOpen}
      onRequestClose={handleInstallTempleWalletModal}
    >
      <ModalHeader
        title="Install a wallet"
        description="Please install a wallet to access the project:"
        className={s.header}
      />
      <Button
        theme="clear"
        href={TEMPLE_WALLET_LINK}
        external
        className={s.button}
      >
        <TempleWallet className={s.icon} />
        Temple wallet
      </Button>
    </Modal>
  );
};
