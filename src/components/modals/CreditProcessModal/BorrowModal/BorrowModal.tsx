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

type BorrowModalProps = {} & ModalActionType;

export const BorrowModal: React.FC<BorrowModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  // 'Borrow' data from api
  const {
    asset,
    yourBorrowLimit,
    borrowLimitUsed: userBorrowLimitUsed,
    pricePerTokenInDollars, // useCurrency
    tezosPrice, // useCurrency
  } = CREDIT_PROCESS_DATA;

  // introduced token amount in dollars/tezos prices (under input values)
  const [introducedValueInBasicPrice, setIntroducedValueInBasicPrice] = useState<number>(0);

  // dynamic values of borrow limit used
  const [dynamicBorrowLimitUsed, setDynamicBorrowLimitUsed] = useState<number>(0);
  const [{ maxAmount, tokenBalance }, setModalState] = useState<ModalState>(defaultModalStateValues);

  // counting values
  useEffect(() => {
    const convertBorrowLimitUsedToDollars = getThePercentageOfTheNumber(yourBorrowLimit, userBorrowLimitUsed);

    // borrow limit used formula
    const borrowLimitUsed = getPercentIsOneNumberFromAnother(
      introducedValueInBasicPrice, yourBorrowLimit,
    ) + userBorrowLimitUsed;

    setDynamicBorrowLimitUsed(borrowLimitUsed);

    // amount of withdraw formula
    const amountUsdToWithdraw = yourBorrowLimit - convertBorrowLimitUsedToDollars;
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
  }, [asset, introducedValueInBasicPrice, pricePerTokenInDollars, userBorrowLimitUsed, yourBorrowLimit]);

  const onSubmit = (props: InputInterface) => {
    console.log('Borrow:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      type={TypeEnum.BORROW}
      theme="secondary"
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={pricePerTokenInDollars ?? tezosPrice}
      title="Borrow"
      balanceLabel="Available to borrow:"
      buttonLabel="Borrow"
      maxAmount={maxAmount}
      tokenBalance={tokenBalance}
      onSumbit={onSubmit}
      setIntroducedValueInBasicPrice={setIntroducedValueInBasicPrice}
      // Modal stats
      yourBorrowLimit={yourBorrowLimit}
      borrowLimitUsed={userBorrowLimitUsed}
      dynamicBorrowLimitUsed={dynamicBorrowLimitUsed}
      // Actions
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    />
  );
};
