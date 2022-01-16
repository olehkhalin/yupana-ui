import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo } from 'react';

import {
  COLLATERAL_PRECISION_BACK,
  CONTRACT_ADDRESS,
  ORACLE_PRICE_PRECISION,
  PROXY_CONTRACT_ADDRESS,
} from 'constants/default';
import { TokenMetadataInterface } from 'types/token';
import { useAccountPkh, useTezos } from 'utils/dapp';
import { borrow, repay } from 'utils/dapp/methods';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { getSliceTokenName } from 'utils/helpers/token';
import useUpdateToast from 'utils/useUpdateToast';
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
  const updateToast = useUpdateToast();

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
  const oraclePrice = useMemo(() => (oraclePrices
    ? oraclePrices[yToken!]
    : { price: new BigNumber(1), decimals: new BigNumber(1) }
  ), [oraclePrices, yToken]);

  const handleBorrowSubmit = useCallback(async (inputAmount: BigNumber) => {
    updateToast({
      type: 'info',
      render: 'Request for Asset Borrow...',
    });
    const params = {
      fabricaContractAddress: CONTRACT_ADDRESS,
      proxyContractAddress: PROXY_CONTRACT_ADDRESS,
      yToken: [yToken!],
      otherYTokens: userBorrowedYTokens,
      amount: inputAmount,
    };

    const operation = await borrow(tezos, accountPkh!, params);
    await operation.confirmation(1);
    updateToast({
      type: 'info',
      render: 'The Asset Supply request was successful, please wait...',
    });
  }, [accountPkh, tezos, updateToast, userBorrowedYTokens, yToken]);

  const handleBorrow = useCallback(() => {
    setProcessCreditData({
      type: TypeEnum.BORROW,
      maxAmount: convertUnits(maxCollateral.minus(outstandingBorrow), COLLATERAL_PRECISION_BACK)
        .div(
          convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
            .multipliedBy(oraclePrice.decimals),
        )
        .multipliedBy(
          asset?.decimals ? new BigNumber(10).pow(asset.decimals) : 1,
        ),
      asset: asset!,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow
          .div(maxCollateral)
          .multipliedBy(1e2),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => {
        if (maxCollateral.eq(0)) {
          return new BigNumber(0);
        }

        return (
          convertUnits(outstandingBorrow, COLLATERAL_PRECISION_BACK)
            .plus(
              input.multipliedBy(
                convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                  .multipliedBy(oraclePrice.decimals),
              ),
            )
        ).div(
          convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK),
        ).multipliedBy(1e2);
      },
      isOpen: true,
      onSubmit: (input: BigNumber) => handleBorrowSubmit(input),
      oraclePrice,
    });
  }, [
    asset,
    handleBorrowSubmit,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    setProcessCreditData,
  ]);

  const handleRepaySubmit = useCallback(async (inputAmount: BigNumber) => {
    updateToast({
      type: 'info',
      render: 'Request for Asset Repay...',
    });
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
    updateToast({
      type: 'info',
      render: 'The Asset Repay request was successful, please wait...',
    });
  }, [accountPkh, asset, tezos, updateToast, yToken]);

  const handleRepay = useCallback(() => {
    setProcessCreditData({
      type: TypeEnum.REPAY,
      maxAmount: borrowed!,
      asset: asset!,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow
          .div(maxCollateral)
          .multipliedBy(1e2),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => {
        if (maxCollateral.eq(0)) {
          return new BigNumber(0);
        }

        return (
          convertUnits(outstandingBorrow, COLLATERAL_PRECISION_BACK)
            .minus(
              input.multipliedBy(
                convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                  .multipliedBy(oraclePrice.decimals),
              ),
            )
        ).div(
          convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK),
        ).multipliedBy(1e2);
      },
      isOpen: true,
      onSubmit: (input: BigNumber) => handleRepaySubmit(input),
      oraclePrice,
    });
  }, [
    asset,
    borrowed,
    handleRepaySubmit,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    setProcessCreditData,
  ]);

  return (
    <TableDropdown
      yToken={yToken!}
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
