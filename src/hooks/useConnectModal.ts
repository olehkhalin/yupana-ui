import { useCallback, useState } from "react";
import constate from "constate";

export const [ConnectWalletModalProvider, useConnectWalletModal] = constate(
  () => {
    const [accountModalIsOpen, setAccountModalIsOpen] =
      useState<boolean>(false);
    const [connectModalIsOpen, setConnectModalIsOpen] =
      useState<boolean>(false);
    const [installTempleWalletModalOpen, setInstallTempleWalletModalOpen] =
      useState(false);

    const handleAccountModal = useCallback(() => {
      setAccountModalIsOpen((prevState) => !prevState);
    }, []);

    const handleConnectModal = useCallback(() => {
      setConnectModalIsOpen((prevState) => !prevState);
    }, []);

    const handleInstallTempleWalletModal = useCallback(() => {
      setInstallTempleWalletModalOpen((prevState) => !prevState);
    }, []);

    return {
      accountModalIsOpen,
      connectModalIsOpen,
      installTempleWalletModalOpen,
      handleAccountModal,
      handleConnectModal,
      handleInstallTempleWalletModal,
    };
  }
);
