import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo } from 'react';

import { CONTRACT_ADDRESS, PROXY_CONTRACT_ADDRESS } from 'constants/default';
import { TokenMetadataInterface } from 'types/token';
import { useAccountPkh, useTezos } from 'utils/dapp';
import { supply, withdraw } from 'utils/dapp/methods';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { getSliceTokenName } from 'utils/helpers/token';
import { useUserGeneralInfo } from 'providers/UserGeneralInfoProvider';
import { useOraclePrices } from 'providers/OraclePricesProvider';
import { TypeEnum, useProcessCredit } from 'providers/ProcessCreditProvider';
import { useUserBorrowedYTokens } from 'providers/UserBorrowedYTokensProvider';

import { TableDropdown, TableDropdownProps } from './TableDropdown';

type SupplyDropdownProps = {
  yToken?: number
  asset?: TokenMetadataInterface
  collateralFactor?: BigNumber
  supplied?: BigNumber
  wallet?: BigNumber
} & TableDropdownProps;

export const SupplyTableDropdown:React.FC<SupplyDropdownProps> = ({
  yToken,
  asset,
  collateralFactor,
  supplied,
  wallet,
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
    ? oraclePrices[yToken!].price
    : new BigNumber(1)
  ), [oraclePrices, yToken]);

  const handleSupplySubmit = useCallback(async (inputAmount: BigNumber) => {
    const params = {
      fabricaContractAddress: CONTRACT_ADDRESS,
      proxyContractAddress: PROXY_CONTRACT_ADDRESS,
      yToken: [yToken!],
      amount: inputAmount,
      tokenContract: asset!.address,
      tokenId: asset!.id,
    };

    const operation = await supply(tezos, accountPkh!, params);
    await operation.confirmation(1);
  }, [accountPkh, asset, tezos, yToken]);

  const handleSupply = useCallback(() => {
    setProcessCreditData({
      type: TypeEnum.SUPPLY,
      maxAmount: wallet!,
      asset: asset!,
      borrowLimit: maxCollateral,
      dynamicBorrowLimitFunc: (input: BigNumber) => (
        maxCollateral.plus(
          input
            .multipliedBy(price)
            .multipliedBy(collateralFactor!),
        )
      ),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => (
        (outstandingBorrow.eq(0) || input.eq(0))
          ? new BigNumber(0)
          : outstandingBorrow.div(
            maxCollateral.plus(
              input
                .multipliedBy(price)
                .multipliedBy(collateralFactor!),
            ),
          )
      ),
      isOpen: true,
      onSubmit: (input: BigNumber) => handleSupplySubmit(input),
    });
  }, [
    asset,
    collateralFactor,
    handleSupplySubmit,
    maxCollateral,
    outstandingBorrow,
    price,
    setProcessCreditData,
    wallet,
  ]);

  const handleWithdrawSubmit = useCallback(async (inputAmount: BigNumber) => {
    const params = {
      fabricaContractAddress: CONTRACT_ADDRESS,
      proxyContractAddress: PROXY_CONTRACT_ADDRESS,
      yToken: [yToken!],
      otherYTokens: userBorrowedYTokens,
      amount: inputAmount,
    };

    const operation = await withdraw(tezos, accountPkh!, params);
    await operation.confirmation(1);
  }, [accountPkh, tezos, userBorrowedYTokens, yToken]);

  const handleWithdraw = () => {
    setProcessCreditData({
      type: TypeEnum.WITHDRAW,
      maxAmount: (maxCollateral.minus(outstandingBorrow))
        .div(price)
        .div(collateralFactor!),
      asset: asset!,
      borrowLimit: maxCollateral,
      dynamicBorrowLimitFunc: (input: BigNumber) => (
        maxCollateral.minus(
          input
            .multipliedBy(price)
            .multipliedBy(collateralFactor!),
        )
      ),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => (
        (outstandingBorrow.eq(0) || input.eq(0))
          ? new BigNumber(0)
          : outstandingBorrow.div(
            maxCollateral.minus(
              input
                .multipliedBy(price)
                .multipliedBy(collateralFactor!),
            ),
          )
      ),
      isOpen: true,
      onSubmit: (input: BigNumber) => handleWithdrawSubmit(input),
    });
  };

  return (
    <TableDropdown
      theme={theme}
      className={className}
      balanceLabel="Supply balance"
      balanceAmount={getPrettyAmount({
        value: convertUnits(supplied!, asset!.decimals),
        currency: getSliceTokenName(asset!),
        dec: asset!.decimals,
      })}
      firstButtonLabel="Supply"
      secondButtonLabel="Withdraw"
      handleFirstButtonClick={handleSupply}
      handleSecondButtonClick={handleWithdraw}
    />
  );
};
