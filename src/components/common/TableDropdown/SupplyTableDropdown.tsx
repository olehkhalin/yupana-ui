import BigNumber from 'bignumber.js';
import React, { useCallback, useMemo } from 'react';

import {
  COLLATERAL_PRECISION_BACK,
  CONTRACT_ADDRESS,
  ORACLE_PRICE_PRECISION,
  PROXY_CONTRACT_ADDRESS,
  STANDARD_PRECISION,
} from 'constants/default';
import { TokenMetadataInterface } from 'types/token';
import { useAccountPkh, useTezos } from 'utils/dapp';
import { supply, withdraw } from 'utils/dapp/methods';
import { convertUnits, getPrettyAmount } from 'utils/helpers/amount';
import { getSliceTokenName } from 'utils/helpers/token';
import useUpdateToast from 'utils/useUpdateToast';
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

  const handleSupplySubmit = useCallback(async (inputAmount: BigNumber) => {
    updateToast({
      type: 'info',
      render: 'Request for Asset Supply...',
    });
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
    updateToast({
      type: 'info',
      render: 'The Asset Supply request was successful, please wait...',
    });
  }, [accountPkh, asset, tezos, updateToast, yToken]);

  const handleSupply = useCallback(() => {
    setProcessCreditData({
      type: TypeEnum.SUPPLY,
      maxAmount: wallet!,
      asset: asset!,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK),
      dynamicBorrowLimitFunc: (input: BigNumber) => (
        convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK)
          .plus(
            input
              .multipliedBy(
                convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                  .multipliedBy(oraclePrice.decimals),
              )
              .multipliedBy(
                convertUnits(collateralFactor!, STANDARD_PRECISION),
              ),
          )
      ),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral).multipliedBy(1e2),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => {
        if (maxCollateral.eq(0)) {
          return new BigNumber(0);
        }

        if (outstandingBorrow.eq(0) || input.eq(0)) {
          return outstandingBorrow.div(maxCollateral).multipliedBy(1e2);
        }

        return (
          convertUnits(outstandingBorrow, COLLATERAL_PRECISION_BACK)
            .div(
              convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK)
                .plus(
                  input
                    .multipliedBy(
                      convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                        .multipliedBy(oraclePrice.decimals),
                    )
                    .multipliedBy(
                      convertUnits(collateralFactor!, STANDARD_PRECISION),
                    ),
                ),
            )
            .multipliedBy(1e2)
        );
      },
      isOpen: true,
      onSubmit: (input: BigNumber) => handleSupplySubmit(input),
      oraclePrice,
    });
  }, [
    asset,
    collateralFactor,
    handleSupplySubmit,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    setProcessCreditData,
    wallet,
  ]);

  const handleWithdrawSubmit = useCallback(async (inputAmount: BigNumber) => {
    updateToast({
      type: 'info',
      render: 'Request for Asset Withdraw...',
    });
    const params = {
      fabricaContractAddress: CONTRACT_ADDRESS,
      proxyContractAddress: PROXY_CONTRACT_ADDRESS,
      yToken: [yToken!],
      otherYTokens: userBorrowedYTokens,
      amount: inputAmount,
    };

    const operation = await withdraw(tezos, accountPkh!, params);
    await operation.confirmation(1);
    updateToast({
      type: 'info',
      render: 'The Asset Withdraw request was successful, please wait...',
    });
  }, [accountPkh, tezos, updateToast, userBorrowedYTokens, yToken]);

  const handleWithdraw = () => {
    const maxAmount = BigNumber.min(
      supplied ?? 0,
      convertUnits(maxCollateral.minus(outstandingBorrow), COLLATERAL_PRECISION_BACK)
        .div(
          convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
            .multipliedBy(oraclePrice.decimals),
        )
        .div(
          convertUnits(collateralFactor!, STANDARD_PRECISION),
        )
        .multipliedBy(
          asset?.decimals ? new BigNumber(10).pow(asset.decimals) : 1,
        ),
    );

    setProcessCreditData({
      type: TypeEnum.WITHDRAW,
      maxAmount,
      asset: asset!,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK),
      dynamicBorrowLimitFunc: (input: BigNumber) => {
        if (maxAmount.eq(0)) {
          return new BigNumber(0);
        }

        return (
          convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK)
            .minus(
              input
                .multipliedBy(
                  convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                    .multipliedBy(oraclePrice.decimals),
                )
                .multipliedBy(
                  convertUnits(collateralFactor!, STANDARD_PRECISION),
                ),
            )
        );
      },
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral).multipliedBy(1e2),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => {
        if (maxCollateral.eq(0)) {
          return new BigNumber(0);
        }

        if (outstandingBorrow.eq(0) || input.eq(0)) {
          return outstandingBorrow.div(maxCollateral).multipliedBy(1e2);
        }

        return (
          convertUnits(outstandingBorrow, COLLATERAL_PRECISION_BACK)
            .div(
              convertUnits(maxCollateral, COLLATERAL_PRECISION_BACK)
                .minus(
                  input
                    .multipliedBy(
                      convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION)
                        .multipliedBy(oraclePrice.decimals),
                    )
                    .multipliedBy(
                      convertUnits(collateralFactor!, STANDARD_PRECISION),
                    ),
                ),
            )
            .multipliedBy(1e2)
        );
      },
      isOpen: true,
      onSubmit: (input: BigNumber) => handleWithdrawSubmit(input),
      oraclePrice,
    });
  };

  return (
    <TableDropdown
      yToken={yToken!}
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
