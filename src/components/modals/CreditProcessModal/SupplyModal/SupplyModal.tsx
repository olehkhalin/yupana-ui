/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { getPercentIsOneNumberFromAnother, getPrettyAmount, getThePercentageOfTheNumber } from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import { CREDIT_PROCESS_DATA } from 'components/temp-data/credit-process';
import { CreditProcessModal, InputInterface, ModalActionType } from 'components/modals/CreditProcessModal';

const defaultModalStateValues = {
  tokenBalance: '',
  maxAmount: 0,
};

type ModalState = {
  maxAmount: number
  tokenBalance: string
};

type SupplyModalProps = {} & ModalActionType;

export const SupplyModal: React.FC<SupplyModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  // 'Supply' data from api
  const {
    asset,
    yourBorrowLimit,
    borrowLimitUsed: userBorrowLimitUsed,
    pricePerTokenInDollars, // useCurrency
    tezosPrice, // useCurrency
    collateralFactor, // supply & withdraw
    tokenBalance: walletTokenBalance, // unique field
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
    const borrowLimit = getThePercentageOfTheNumber(
      introducedValueInBasicPrice, collateralFactor,
    ) + yourBorrowLimit;
    // borrow limit used formula
    const borrowLimitUsed = getPercentIsOneNumberFromAnother(
      convertBorrowLimitUsedToDollars, borrowLimit,
    );

    setDynamicBorrowLimit(borrowLimit);
    setDynamicBorrowLimitUsed(borrowLimitUsed);

    setModalState({
      tokenBalance: getPrettyAmount({
        value: walletTokenBalance,
        currency: getTokenName(asset),
        dec: asset.decimals,
      }),
      maxAmount: walletTokenBalance,
    });
  }, [asset, collateralFactor, introducedValueInBasicPrice, userBorrowLimitUsed, walletTokenBalance, yourBorrowLimit]);

  const onSubmit = (props: InputInterface) => {
    console.log('Supply:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={pricePerTokenInDollars ?? tezosPrice}
      title="Supply"
      balanceLabel="Wallet balance"
      buttonLabel="Supply"
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
