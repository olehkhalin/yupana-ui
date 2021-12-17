/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import {
  convertDollarsToTokenAmount, getPercentIsOneNumberFromAnother, getPrettyAmount, getThePercentageOfTheNumber,
} from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import { CreditProcessModal, InputInterface, ModalActionType } from 'components/modals/CreditProcessModal';
import { CREDIT_PROCESS_DATA } from 'components/temp-data/credit-process';
import { TypeEnum } from '../CreditProcessModal';

const defaultModalStateValues = {
  tokenBalance: '',
  maxAmount: 0,
};

type ModalState = {
  maxAmount: number
  tokenBalance: string
};

type RepayModalProps = {} & ModalActionType;

export const RepayModal: React.FC<RepayModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  // 'Repay' data from api
  const {
    asset,
    yourBorrowLimit,
    borrowLimitUsed: userBorrowLimitUsed,
    pricePerTokenInDollars, // useCurrency
    tezosPrice, // useCurrency
    borrowByCurrentToken, // !unique
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
      convertBorrowLimitUsedToDollars - introducedValueInBasicPrice, yourBorrowLimit,
    );

    setDynamicBorrowLimitUsed(borrowLimitUsed);

    // convert dollars to amount of current token
    const tokenBorrow = convertDollarsToTokenAmount(borrowByCurrentToken, pricePerTokenInDollars);

    setModalState({
      tokenBalance: getPrettyAmount({
        value: tokenBorrow,
        currency: getTokenName(asset),
        dec: asset.decimals,
      }),
      maxAmount: tokenBorrow,
    });
  }, [asset, borrowByCurrentToken, introducedValueInBasicPrice, pricePerTokenInDollars, userBorrowLimitUsed, yourBorrowLimit]);

  const onSubmit = (props: InputInterface) => {
    console.log('Repay:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      type={TypeEnum.REPAY}
      theme="secondary"
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={pricePerTokenInDollars ?? tezosPrice}
      title="Repay"
      balanceLabel="Available to repay:"
      buttonLabel="Repay"
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
