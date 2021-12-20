/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
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

const WithdrawModalWrapper: React.FC<AssetModalProps> = ({
  type,
  asset,
  oraclePrice,
  collateralFactor,
  maxCollateral,
  outstandingBorrow,
  isOpen,
  onRequestClose,
}) => {
  // introduced token amount in dollars/tezos prices (under input values)
  const [introducedValueInBasicPrice, setIntroducedValueInBasicPrice] = useState<number>(0);

  // dynamic values of borrow limit & borrow limit used
  const [dynamicBorrowLimit, setDynamicBorrowLimit] = useState<number>(0);
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState<number>(0);
  const [{ maxAmount, tokenBalance }, setModalState] = useState<ModalState>(defaultModalStateValues);

  // counting values
  useEffect(() => {
    const borrowLimit = maxCollateral - introducedValueInBasicPrice * collateralFactor!;
    const borrowLimitUsed = outstandingBorrow / (maxCollateral - introducedValueInBasicPrice * collateralFactor!);
    const availableToWithdraw = Number(new BigNumber((maxCollateral - outstandingBorrow) / oraclePrice / collateralFactor!).div(`1e${asset.decimals}`));
    setDynamicBorrowLimit(borrowLimit);
    setDynamicBorrowLimitUsed(borrowLimitUsed);

    setModalState({
      tokenBalance: getPrettyAmount({
        value: convertUnits(availableToWithdraw, asset.decimals),
        currency: getTokenName(asset),
        dec: asset.decimals,
      }),
      maxAmount: +convertUnits(availableToWithdraw, asset.decimals),
    });
  }, [asset, collateralFactor, introducedValueInBasicPrice, maxCollateral, oraclePrice, outstandingBorrow]);

  const onSubmit = (props: InputInterface) => {
    console.log('Withdraw:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      type={TypeEnum.WITHDRAW}
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={oraclePrice}
      title="Withdraw"
      balanceLabel="Available to withdraw:"
      buttonLabel="Withdraw"
      maxAmount={maxAmount}
      tokenBalance={tokenBalance}
      onSumbit={onSubmit}
      setIntroducedValueInBasicPrice={setIntroducedValueInBasicPrice}
      // Modal stats
      yourBorrowLimit={maxCollateral}
      borrowLimitUsed={outstandingBorrow / maxCollateral}
      dynamicBorrowLimitUsed={dynamicBorrowLimitUsed}
      dynamicBorrowLimit={dynamicBorrowLimit}
      // Actions
      isOpen={isOpen && type === CreditProcessType.WITHDRAW}
      onRequestClose={onRequestClose}
    />
  );
};

export const WithdrawModal: React.FC = () => {
  // get data from modal provider
  const { creditProcess, isOpen, closeModal } = useCreditProcess();

  if (!creditProcess) {
    return <></>;
  }

  return (
    <WithdrawModalWrapper
      {...creditProcess}
      onRequestClose={closeModal}
      isOpen={isOpen}
    />
  );
};
