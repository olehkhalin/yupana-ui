/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { getPrettyAmount } from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import {
  CreditProcessModal, InputInterface, TypeEnum, AssetModalProps,
} from 'components/modals/CreditProcessModal';
import { CreditProcessType, useCreditProcess } from 'providers/CreditProcessProvider';

const defaultModalStateValues = {
  tokenBalance: '',
  maxAmount: 0,
};

type ModalState = {
  maxAmount: number
  tokenBalance: string
};

const BorrowModalWrapper: React.FC<AssetModalProps> = ({
  type,
  asset,
  oraclePrice,
  maxCollateral,
  outstandingBorrow,
  isOpen,
  onRequestClose,
}) => {
  // introduced token amount in dollars/tezos prices (under input values)
  const [introducedValueInBasicPrice, setIntroducedValueInBasicPrice] = useState<number>(0);

  // dynamic values of borrow limit used
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState<number>(0);
  const [{ maxAmount, tokenBalance }, setModalState] = useState<ModalState>(defaultModalStateValues);

  // counting values
  useEffect(() => {
    const borrowLimitUsed = (outstandingBorrow + introducedValueInBasicPrice) / maxCollateral;
    const amountUsdToWithdraw = outstandingBorrow - borrowLimitUsed;
    setDynamicBorrowLimitUsed(borrowLimitUsed);

    setModalState({
      tokenBalance: getPrettyAmount({
        value: amountUsdToWithdraw,
        currency: getTokenName(asset),
        dec: asset.decimals,
      }),
      maxAmount: amountUsdToWithdraw,
    });
  }, [asset, introducedValueInBasicPrice, maxCollateral, outstandingBorrow]);

  const onSubmit = (props: InputInterface) => {
    console.log('Borrow:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      type={TypeEnum.BORROW}
      theme="secondary"
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={oraclePrice}
      title="Borrow"
      balanceLabel="Available to borrow:"
      buttonLabel="Borrow"
      maxAmount={maxAmount}
      tokenBalance={tokenBalance}
      onSumbit={onSubmit}
      setIntroducedValueInBasicPrice={setIntroducedValueInBasicPrice}
      // Modal stats
      yourBorrowLimit={maxCollateral}
      borrowLimitUsed={outstandingBorrow / maxCollateral}
      dynamicBorrowLimitUsed={dynamicBorrowLimitUsed}
      // Actions
      isOpen={isOpen && type === CreditProcessType.BORROW}
      onRequestClose={onRequestClose}
    />
  );
};

export const BorrowModal: React.FC = () => {
  // get data from modal provider
  const { creditProcess, isOpen, closeModal } = useCreditProcess();

  if (!creditProcess) {
    return <></>;
  }

  return (
    <BorrowModalWrapper
      {...creditProcess}
      onRequestClose={closeModal}
      isOpen={isOpen}
    />
  );
};
