import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo } from 'react';

import { CONTRACT_ADDRESS, PROXY_CONTRACT_ADDRESS } from 'constants/default';
import { TokenMetadataInterface } from 'types/token';
import { useAccountPkh, useTezos } from 'utils/dapp';
import { borrow, repay } from 'utils/dapp/methods';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { getSliceTokenName } from 'utils/helpers/token';
import { useUserGeneralInfo } from 'providers/UserGeneralInfoProvider';
import { useOraclePrices } from 'providers/OraclePricesProvider';
import { TypeEnum, useProcessCredit } from 'providers/ProcessCreditProvider';
import { useUserBorrowedYTokens } from 'providers/UserBorrowedYTokensProvider';

import { TableDropdown, TableDropdownProps } from './TableDropdown';

type BorrowDropdownProps = {
  yToken?: number
  asset?: TokenMetadataInterface
  borrowed?: BigNumber
} & TableDropdownProps;

export const BorrowTableDropdown:React.FC<BorrowDropdownProps> = ({
  yToken,
  asset,
  borrowed,
  theme,
  className,
}) => {
  const { userGeneralInfo } = useUserGeneralInfo();
  const { oraclePrices } = useOraclePrices();
  const { setProcessCreditData } = useProcessCredit();
  const { userBorrowedYTokens } = useUserBorrowedYTokens();

  const tezos = useTezos()!;
  const accountPkh = useAccountPkh();

  const maxCollateral = useMemo(() => (userGeneralInfo
    ? userGeneralInfo.maxCollateral
    : new BigNumber(0)
  ), [userGeneralInfo]);
  const outstandingBorrow = useMemo(() => (userGeneralInfo
    ? userGeneralInfo.outstandingBorrow
    : new BigNumber(0)
  ), [userGeneralInfo]);
  const price = useMemo(() => (oraclePrices
    ? oraclePrices[yToken!]
    : new BigNumber(1)
  ), [oraclePrices, yToken]);

  const handleBorrowSubmit = useCallback(async (inputAmount: BigNumber) => {
    const params = {
      fabricaContractAddress: CONTRACT_ADDRESS,
      proxyContractAddress: PROXY_CONTRACT_ADDRESS,
      yToken: [yToken!],
      otherYTokens: userBorrowedYTokens,
      amount: inputAmount,
    };

    const operation = await borrow(tezos, accountPkh!, params);
    await operation.confirmation(1);
  }, [accountPkh, tezos, userBorrowedYTokens, yToken]);

  const handleBorrow = useCallback(() => {
    setProcessCreditData({
      type: TypeEnum.BORROW,
      maxAmount: (maxCollateral.minus(outstandingBorrow)).div(price),
      asset: asset!,
      borrowLimit: maxCollateral,
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => (
        maxCollateral.eq(0)
          ? new BigNumber(0)
          : (outstandingBorrow.plus(
            input.multipliedBy(price),
          )).div(maxCollateral)
      ),
      isOpen: true,
      onSubmit: (input: BigNumber) => handleBorrowSubmit(input),
    });
  }, [
    asset,
    handleBorrowSubmit,
    maxCollateral,
    outstandingBorrow,
    price,
    setProcessCreditData,
  ]);

  const handleRepaySubmit = useCallback(async (inputAmount: BigNumber) => {
    const params = {
      fabricaContractAddress: CONTRACT_ADDRESS,
      proxyContractAddress: PROXY_CONTRACT_ADDRESS,
      yToken: [yToken!],
      amount: inputAmount,
      tokenContract: asset!.address,
      tokenId: asset!.id,
    };

    const operation = await repay(tezos, accountPkh!, params);
    await operation.confirmation(1);
  }, [accountPkh, asset, tezos, yToken]);

  const handleRepay = useCallback(() => {
    setProcessCreditData({
      type: TypeEnum.REPAY,
      maxAmount: borrowed!,
      asset: asset!,
      borrowLimit: maxCollateral,
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => (
        maxCollateral.eq(0)
          ? new BigNumber(0)
          : (outstandingBorrow.minus(
            input.multipliedBy(price),
          )).div(maxCollateral)
      ),
      isOpen: true,
      onSubmit: (input: BigNumber) => handleRepaySubmit(input),
    });
  }, [
    asset,
    borrowed,
    handleRepaySubmit,
    maxCollateral,
    outstandingBorrow,
    price,
    setProcessCreditData,
  ]);

  return (
    <TableDropdown
      theme={theme}
      className={className}
      balanceLabel="Borrow balance"
      balanceAmount={getPrettyAmount({
        value: convertUnits(borrowed!, asset!.decimals),
        currency: getSliceTokenName(asset!),
        dec: asset!.decimals,
      })}
      firstButtonLabel="Borrow"
      handleFirstButtonClick={handleBorrow}
      secondButtonLabel="Repay"
      handleSecondButtonClick={handleRepay}
    />
  );
};
