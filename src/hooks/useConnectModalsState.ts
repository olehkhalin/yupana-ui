import constate from 'constate';
import { useState, useCallback } from 'react';

export const [
  ConnectModalsStateProvider,
  useConnectModalsState,
] = constate(() => {
  const [installTempleWalletModalOpen, setInstallTempleWalletModalOpen] = useState(false);

  const openInstallTempleWalletModal = () => setInstallTempleWalletModalOpen(true);
  const closeInstallTempleWalletModal = useCallback(
    () => setInstallTempleWalletModalOpen(false),
    [],
  );

  return {
    installTempleWalletModalOpen,
    openInstallTempleWalletModal,
    closeInstallTempleWalletModal,
  };
});
