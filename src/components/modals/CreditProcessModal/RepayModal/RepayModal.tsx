/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { CreditProcessType, useCreditProcess } from 'providers/CreditProcessProvider';

import { getPrettyAmount } from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import {
  CreditProcessModal, InputInterface, TypeEnum, AssetModalProps,
} from 'components/modals/CreditProcessModal';
import { useUserStats } from 'providers/UserStatsProvider';

const defaultModalStateValues = {
  tokenBalance: '',
  maxAmount: 0,
};

type ModalState = {
  maxAmount: number
  tokenBalance: string
};

export const RepayModalWrapper: React.FC<AssetModalProps> = ({
  yToken,
  type,
  asset,
  oraclePrice,
  maxCollateral,
  outstandingBorrow,
  isOpen,
  onRequestClose,
}) => {
  const { findBorrowedToken } = useUserStats();

  // introduced token amount in dollars/tezos prices (under input values)
  const [introducedValueInBasicPrice, setIntroducedValueInBasicPrice] = useState<number>(0);

  // dynamic values of borrow limit used
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState<number>(0);
  const [{ maxAmount, tokenBalance }, setModalState] = useState<ModalState>(defaultModalStateValues);

  // counting values
  useEffect(() => {
    const borrowLimitUsed = (outstandingBorrow - introducedValueInBasicPrice) / maxCollateral;
    // TODO: Research formula - amountToRepay
    const amountToRepay = Number(findBorrowedToken(yToken)?.borrowed) ?? 0;
    setDynamicBorrowLimitUsed(borrowLimitUsed);

    setModalState({
      tokenBalance: getPrettyAmount({
        value: amountToRepay,
        currency: getTokenName(asset),
        dec: asset.decimals,
      }),
      maxAmount: amountToRepay,
    });
  }, [asset, findBorrowedToken, introducedValueInBasicPrice, maxCollateral, outstandingBorrow, yToken]);

  const onSubmit = (props: InputInterface) => {
    console.log('Repay:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      type={TypeEnum.REPAY}
      theme="secondary"
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={oraclePrice}
      title="Repay"
      balanceLabel="Available to repay:"
      buttonLabel="Repay"
      maxAmount={maxAmount}
      tokenBalance={tokenBalance}
      onSumbit={onSubmit}
      setIntroducedValueInBasicPrice={setIntroducedValueInBasicPrice}
      // Modal stats
      yourBorrowLimit={maxCollateral}
      borrowLimitUsed={outstandingBorrow / maxCollateral}
      dynamicBorrowLimitUsed={dynamicBorrowLimitUsed}
      // Actions
      isOpen={isOpen && type === CreditProcessType.REPAY}
      onRequestClose={onRequestClose}
    />
  );
};

export const RepayModal: React.FC = () => {
  // get data from modal provider
  const { creditProcess, isOpen, closeModal } = useCreditProcess();

  if (!creditProcess) {
    return <></>;
  }

  return (
    <RepayModalWrapper
      {...creditProcess}
      onRequestClose={closeModal}
      isOpen={isOpen}
    />
  );
};
