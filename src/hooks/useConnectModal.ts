import { useCallback, useState } from "react";
import constate from "constate";

export const [ConnectWalletModalProvider, useConnectWalletModal] = constate(
  () => {
    const [accountModalIsOpen, setAccountModalIsOpen] =
      useState<boolean>(false);
    const [connectModalIsOpen, setConnectModalIsOpen] =
      useState<boolean>(false);

    const handleAccountModal = useCallback(() => {
      setAccountModalIsOpen(!accountModalIsOpen);
    }, [accountModalIsOpen]);

    const handleConnectModal = useCallback(() => {
      setConnectModalIsOpen(!connectModalIsOpen);
    }, [connectModalIsOpen, setConnectModalIsOpen]);

    return {
      accountModalIsOpen,
      connectModalIsOpen,
      handleAccountModal,
      handleConnectModal,
    };
  }
);
