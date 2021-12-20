import { useState, useCallback, useEffect } from 'react';
import constate from 'constate';

import { TokenMetadataInterface } from 'types/token';

export enum CreditProcessType {
  SUPPLY = 'supply',
  WITHDRAW = 'withdraw',
  BORROW = 'borrow',
  REPAY = 'repay',
}

export type CreditProcessProps = {
  type: CreditProcessType
  isOpen: boolean
  yToken: number
  asset: TokenMetadataInterface
  maxCollateral: number
  outstandingBorrow: number
  oraclePrice: number
  walletBalance?: number
  collateralFactor?: number
};

export const [
  CreditProcessProvider,
  useCreditProcess,
] = constate(() => {
  const [creditProcessState, setCreditProcessState] = useState<CreditProcessProps | null>(null);
  const [isOpen, setModalIsOpen] = useState<boolean>(false);

  const setCreditProcess = useCallback((props: CreditProcessProps) => {
    setCreditProcessState(props);
  }, []);

  const closeModal = useCallback(
    () => {
      setModalIsOpen(false);
    },
    [],
  );

  useEffect(() => {
    if (creditProcessState) {
      setModalIsOpen(creditProcessState.isOpen);
    }
  }, [creditProcessState]);

  return {
    creditProcess: creditProcessState,
    setCreditProcess,
    closeModal,
    isOpen,
  };
});
