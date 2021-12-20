/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';

import { CreditProcessType, useCreditProcess } from 'providers/CreditProcessProvider';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { getTokenName } from 'utils/helpers/token';
import { CreditProcessModal, InputInterface } from 'components/modals/CreditProcessModal';
import { AssetModalProps } from '../CreditProcessModal';

const defaultModalStateValues = {
  tokenBalance: '',
  maxAmount: 0,
};

type ModalState = {
  maxAmount: number
  tokenBalance: string
};

const SupplyModalWrapper: React.FC<AssetModalProps> = ({
  type,
  asset,
  oraclePrice,
  collateralFactor,
  walletBalance,
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
    const borrowLimit = maxCollateral + introducedValueInBasicPrice * collateralFactor!;
    const borrowLimitUsed = (outstandingBorrow / ((maxCollateral + introducedValueInBasicPrice) * collateralFactor!));
    setDynamicBorrowLimit(borrowLimit);
    setDynamicBorrowLimitUsed(borrowLimitUsed);

    setModalState({
      tokenBalance: getPrettyAmount({
        value: convertUnits(walletBalance ?? 0, asset.decimals),
        currency: getTokenName(asset),
        dec: asset.decimals,
      }),
      maxAmount: +convertUnits(walletBalance ?? 0, asset.decimals),
    });
  }, [asset, collateralFactor, introducedValueInBasicPrice, maxCollateral, outstandingBorrow, walletBalance]);

  const onSubmit = (props: InputInterface) => {
    console.log('Supply:', JSON.stringify(props, null, 2));
  };

  return (
    <CreditProcessModal
      asset={asset}
      // TODO: Add switch currency function
      pricePerTokenInBasicCurrency={oraclePrice}
      title="Supply"
      balanceLabel="Wallet balance"
      buttonLabel="Supply"
      maxAmount={maxAmount}
      tokenBalance={tokenBalance}
      onSumbit={onSubmit}
      setIntroducedValueInBasicPrice={setIntroducedValueInBasicPrice}
      // Modal stats
      yourBorrowLimit={maxCollateral} // check decimals
      borrowLimitUsed={outstandingBorrow / maxCollateral} // formula
      dynamicBorrowLimitUsed={dynamicBorrowLimitUsed}
      dynamicBorrowLimit={dynamicBorrowLimit}
      // Actions
      isOpen={isOpen && type === CreditProcessType.SUPPLY}
      onRequestClose={onRequestClose}
    />
  );
};

export const SupplyModal: React.FC = () => {
  // get data from modal provider
  const { creditProcess, isOpen, closeModal } = useCreditProcess();

  if (!creditProcess) {
    return <></>;
  }

  return (
    <SupplyModalWrapper
      {...creditProcess}
      onRequestClose={closeModal}
      isOpen={isOpen}
    />
  );
};
