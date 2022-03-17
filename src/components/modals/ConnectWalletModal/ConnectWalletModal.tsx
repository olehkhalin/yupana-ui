import React, { FC, useCallback } from "react";

import { useConnectWalletModal } from "hooks/useConnectModal";
import { useUpdateToast } from "hooks/useUpdateToast";
import {
  TEMPLE_WALLET_NOT_INSTALLED_MESSAGE,
  useConnectWithBeacon,
  useConnectWithTemple,
} from "utils/dapp";
import { Modal } from "components/ui/Modal";
import { Button } from "components/ui/Button";
import { ModalHeader } from "components/ui/Modal/ModalHeader";
import { ReactComponent as TempleWallet } from "svg/TempleWallet.svg";
import { ReactComponent as Beacon } from "svg/Beacon.svg";

import s from "./ConnectWalletModal.module.sass";

enum WalletType {
  BEACON = "beacon",
  TEMPLE = "temple",
}

export const ConnectWalletModal: FC = () => {
  const {
    connectModalIsOpen,
    handleConnectModal,
    handleInstallTempleWalletModal,
  } = useConnectWalletModal();
  const connectWithBeacon = useConnectWithBeacon();
  const connectWithTemple = useConnectWithTemple();
  const { updateToast } = useUpdateToast();

  const handleConnectClick = useCallback(
    async (walletType: WalletType) => {
      try {
        if (walletType === WalletType.BEACON) {
          await connectWithBeacon(true);
          handleConnectModal();
        } else {
          await connectWithTemple(true);
          handleConnectModal();
        }
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === TEMPLE_WALLET_NOT_INSTALLED_MESSAGE) {
            handleConnectModal();
            handleInstallTempleWalletModal();
          } else {
            updateToast({
              type: "error",
              render: `Error while connecting with ${
                walletType === WalletType.BEACON ? "Beacon" : "Temple Wallet"
              }: ${e.message}`,
            });
          }
        } else {
          updateToast({
            type: "error",
            render: `Error while connecting with ${
              walletType === WalletType.BEACON ? "Beacon" : "Temple Wallet"
            }`,
          });
        }
      }
    },
    [
      connectWithBeacon,
      connectWithTemple,
      handleConnectModal,
      handleInstallTempleWalletModal,
      updateToast,
    ]
  );

  return (
    <Modal isOpen={connectModalIsOpen} onRequestClose={handleConnectModal}>
      <ModalHeader
        title="Connect to a wallet"
        description="Please select a wallet to connect to this dapp:"
        className={s.root}
      />
      <div className={s.wallets}>
        <Button
          theme="clear"
          onClick={() => handleConnectClick(WalletType.TEMPLE)}
          className={s.button}
        >
          <TempleWallet className={s.icon} />
          Temple wallet
        </Button>

        <Button
          theme="clear"
          onClick={() => handleConnectClick(WalletType.BEACON)}
          className={s.button}
        >
          <Beacon className={s.icon} />
          Beacon
        </Button>
      </div>
    </Modal>
  );
};
