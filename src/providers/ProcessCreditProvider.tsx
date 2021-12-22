import constate from 'constate';
import { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';

import { TokenMetadataInterface } from 'types/token';
import { ModalActions } from 'types/modal';

export enum TypeEnum {
  SUPPLY = 'supply',
  WITHDRAW = 'withdraw',
  BORROW = 'borrow',
  REPAY = 'repay',
}

type ProcessCreditProps = {
  type: TypeEnum
  maxAmount: BigNumber
  asset: TokenMetadataInterface
  borrowLimit: BigNumber
  dynamicBorrowLimitFunc?: (input: BigNumber) => BigNumber
  borrowLimitUsed: BigNumber
  dynamicBorrowLimitUsedFunc: (input: BigNumber) => BigNumber
} & Pick<ModalActions, 'isOpen'> | null;

export const [
  ProcessCreditProvider,
  useProcessCredit,
] = constate(() => {
  const [infoState, setInfoState] = useState<ProcessCreditProps>(null);

  const setProcessCreditData = useCallback((info: ProcessCreditProps) => {
    setInfoState(info);
  }, []);

  return {
    processCreditData: infoState,
    setProcessCreditData,
  };
});
