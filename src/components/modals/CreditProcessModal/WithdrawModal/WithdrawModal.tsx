/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import {
  convertDollarsToTokenAmount, getPercentIsOneNumberFromAnother, getPrettyAmount, getThePercentageOfTheNumber,
} from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import {
  CreditProcessModal, InputInterface, ModalActionType, TypeEnum,
} from 'components/modals/CreditProcessModal';
import { CREDIT_PROCESS_DATA } from 'components/temp-data/credit-process';

const defaultModalStateValues = {
  tokenBalance: '',
  maxAmount: 0,
};

type ModalState = {
  maxAmount: number
  tokenBalance: string
};

type WithdrawModalProps = {} & ModalActionType;

export const WithdrawModal: React.FC<WithdrawModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  // 'Withdraw' data from api
  const {
    asset,
    yourBorrowLimit,
    borrowLimitUsed: userBorrowLimitUsed,
    pricePerTokenInDollars, // useCurrency
    tezosPrice, // useCurrency
    collateralFactor, // supply & withdraw
    supplyBalance, // unique field
  } = CREDIT_PROCESS_DATA;

  // introduced token amount in dollars/tezos prices (under input values)
  const [introducedValueInBasicPrice, setIntroducedValueInBasicPrice] = useState<number>(0);

  // dynamic values of borrow limit & borrow limit used
  const [dynamicBorrowLimit, setDynamicBorrowLimit] = useState<number>(0);
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState<number>(0);
  const [{ maxAmount, tokenBalance }, setModalState] = useState<ModalState>(defaultModalStateValues);

  // counting values
  useEffect(() => {
    const convertBorrowLimitUsedToDollars = getThePercentageOfTheNumber(yourBorrowLimit, userBorrowLimitUsed);

    // borrow limit formula
    const borrowLimit = yourBorrowLimit - (convertBorrowLimitUsedToDollars + getThePercentageOfTheNumber(
      introducedValueInBasicPrice,
      collateralFactor,
    ));
    // borrow limit used formula
    const borrowLimitUsed = getPercentIsOneNumberFromAnother(
      (convertBorrowLimitUsedToDollars + getThePercentageOfTheNumber(
        introducedValueInBasicPrice,
        collateralFactor,
      )), yourBorrowLimit,
    );

    setDynamicBorrowLimit(borrowLimit);
    setDynamicBorrowLimitUsed(borrowLimitUsed);

    // amount of withdraw formula
    const amountUsdToWithdraw = supplyBalance - ((convertBorrowLimitUsedToDollars * 100) / collateralFactor);
    // convert dollars to amount of current token
    const tokenBorrow = convertDollarsToTokenAmount(amountUsdToWithdraw, pricePerTokenInDollars);

    setModalState({
      tokenBalance: getPrettyAmount({
        value: tokenBorrow,
        currency: getTokenName(asset),
        dec: asset.decimals,
      }),
      maxAmount: tokenBorrow,
    });
  }, [asset, collateralFactor, introducedValueInBasicPrice, pricePerTokenInDollars, supplyBalance, userBorrowLimitUsed, yourBorrowLimit]);

  const onSubmit = (props: InputInterface) => {
    console.log('Withdraw:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      type={TypeEnum.WITHDRAW}
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={pricePerTokenInDollars ?? tezosPrice}
      title="Withdraw"
      balanceLabel="Available to withdraw:"
      buttonLabel="Withdraw"
      maxAmount={maxAmount}
      tokenBalance={tokenBalance}
      onSumbit={onSubmit}
      setIntroducedValueInBasicPrice={setIntroducedValueInBasicPrice}
      // Modal stats
      yourBorrowLimit={yourBorrowLimit}
      borrowLimitUsed={userBorrowLimitUsed}
      dynamicBorrowLimitUsed={dynamicBorrowLimitUsed}
      dynamicBorrowLimit={dynamicBorrowLimit}
      // Actions
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    />
  );
};
