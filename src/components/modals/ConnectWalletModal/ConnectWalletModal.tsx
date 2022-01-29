import React, { FC, useCallback } from "react";

import { useConnectModalsState } from "hooks/useConnectModalsState";
import { useUpdateToast } from "hooks/useUpdateToast";
import { ModalActions } from "types/modal";
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

export const ConnectWalletModal: FC<ModalActions> = ({
  isOpen,
  onRequestClose,
}) => {
  const { openInstallTempleWalletModal } = useConnectModalsState();
  const connectWithBeacon = useConnectWithBeacon();
  const connectWithTemple = useConnectWithTemple();
  const { updateToast } = useUpdateToast();

  const handleConnectClick = useCallback(
    async (walletType: WalletType) => {
      try {
        if (walletType === WalletType.BEACON) {
          await connectWithBeacon(true);
          onRequestClose();
        } else {
          await connectWithTemple(true);
          onRequestClose();
        }
      } catch (e) {
        if (e instanceof Error) {
          if (e.message === TEMPLE_WALLET_NOT_INSTALLED_MESSAGE) {
            onRequestClose();
            openInstallTempleWalletModal();
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
      onRequestClose,
      openInstallTempleWalletModal,
      updateToast,
    ]
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
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
