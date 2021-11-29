import constate from 'constate';
import { useState, useCallback } from 'react';

export const [
  ConnectModalsStateProvider,
  useConnectModalsState,
] = constate(() => {
  const [installTempleWalletModalOpen, setInstallTempleWalletModalOpen] = useState(false);
  const [connectWalletModalOpen, setConnectWalletModalOpen] = useState(false);

  const openInstallTempleWalletModal = useCallback(() => setInstallTempleWalletModalOpen(true), []);
  const closeInstallTempleWalletModal = useCallback(
    () => setInstallTempleWalletModalOpen(false),
    [],
  );
  const openConnectWalletModal = useCallback(() => setConnectWalletModalOpen(true), []);
  const closeConnectWalletModal = useCallback(() => setConnectWalletModalOpen(false), []);

  return {
    installTempleWalletModalOpen,
    connectWalletModalOpen,
    openInstallTempleWalletModal,
    closeInstallTempleWalletModal,
    openConnectWalletModal,
    closeConnectWalletModal,
  };
});
