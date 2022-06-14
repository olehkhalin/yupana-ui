import React, { FC, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import { useReactiveVar } from "@apollo/client";

import { useOraclePriceQuery } from "generated/graphql";
import {
  COLLATERAL_PRECISION,
  ORACLE_PRICE_PRECISION,
  STANDARD_PRECISION,
} from "constants/defaults";
import { AssetType } from "types/asset";
import {
  CreditProcessModalEnum,
  useCreditProcessModal,
} from "hooks/useCreditProcessModal";
import { useBalance } from "hooks/useBalance";
import { useUpdateToast } from "hooks/useUpdateToast";
import { Status, useTransactions } from "hooks/useTransactions";
import {
  borrowedYTokensVar,
  contractAddressesVar,
  globalVariablesVar,
} from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";
import { borrow, repay } from "utils/dapp/methods";
import { convertUnits } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";

import { TableDropdown, TableDropdownProps } from "./TableDropdown";

type BorrowDropdownProps = {
  yToken: number;
  asset: AssetType;
  borrow: BigNumber;
  borrowInterestReserves: BigNumber;
  liquidity: BigNumber;
  tableName: string;
} & TableDropdownProps;

export const BorrowTableDropdown: FC<BorrowDropdownProps> = ({
  yToken,
  asset,
  borrow: borrowed,
  borrowInterestReserves,
  liquidity,
  theme,
  tableName,
  className,
}) => {
  const { setCreditProcessModalData } = useCreditProcessModal();
  const { data: oraclePrices } = useOraclePriceQuery();
  const { maxCollateral, outstandingBorrow } =
    useReactiveVar(globalVariablesVar);
  const borrowedYTokens = useReactiveVar(borrowedYTokensVar);
  const { fabrica, priceFeedProxy } = useReactiveVar(contractAddressesVar);
  const { updateToast } = useUpdateToast();
  const { addTransaction, updateTransactionStatus, allTransactions } =
    useTransactions();
  const { data: balanceData, loading: balanceLoading } = useBalance(asset);

  const tezos = useTezos()!;
  const accountPkh = useAccountPkh()!;

  const oraclePrice = useMemo(
    () =>
      oraclePrices
        ? oraclePrices.oraclePrice.find(({ ytoken }) => ytoken === yToken) ?? {
            price: new BigNumber(0),
            precision: 0,
          }
        : {
            price: new BigNumber(0),
            precision: 0,
          },
    [oraclePrices, yToken]
  );

  const handleBorrowSubmit = useCallback(
    async (inputAmount: BigNumber) => {
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken],
        tokenContract: asset.contractAddress,
        otherYTokens: borrowedYTokens,
        amount: inputAmount,
      };

      const prepareTransaction = {
        type: "Borrow",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        status: Status.PENDING,
        opHash: "",
        timestamp: Date.now(),
      };

      const operation = await borrow(tezos, accountPkh!, params);
      prepareTransaction.opHash = operation.opHash;
      addTransaction(prepareTransaction);
      updateToast({
        type: "info",
        render: `Request for ${getAssetName(
          asset
        )} Borrow. You can follow your transaction in transaction history.`,
      });
      await operation.confirmation(1);
      updateTransactionStatus(prepareTransaction, allTransactions);
      updateToast({
        type: "info",
        render: `The ${getAssetName(asset)} Borrow request was successful!`,
      });
    },
    [
      accountPkh,
      addTransaction,
      allTransactions,
      asset,
      borrowedYTokens,
      fabrica,
      priceFeedProxy,
      tezos,
      updateToast,
      updateTransactionStatus,
      yToken,
    ]
  );

  const pureAssetLiquidity = useMemo(
    () =>
      convertUnits(convertUnits(liquidity, STANDARD_PRECISION), asset.decimals),
    [asset.decimals, liquidity]
  );

  const handleBorrow = useCallback(() => {
    setCreditProcessModalData({
      type: CreditProcessModalEnum.BORROW,
      maxAmount: outstandingBorrow.gt(maxCollateral)
        ? new BigNumber(0)
        : convertUnits(
            maxCollateral.minus(outstandingBorrow),
            COLLATERAL_PRECISION
          )
            .div(
              convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.precision)
            )
            .multipliedBy(new BigNumber(10).pow(asset.decimals)),
      liquidity: pureAssetLiquidity,
      asset: asset,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral).multipliedBy(1e2),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => {
        if (maxCollateral.eq(0)) {
          return new BigNumber(0);
        }

        return convertUnits(outstandingBorrow, COLLATERAL_PRECISION)
          .plus(
            input.multipliedBy(
              convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.precision)
            )
          )
          .div(convertUnits(maxCollateral, COLLATERAL_PRECISION))
          .multipliedBy(1e2);
      },
      isOpen: true,
      onSubmit: (input: BigNumber) => handleBorrowSubmit(input),
      oraclePrice,
    });
  }, [
    setCreditProcessModalData,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    asset,
    pureAssetLiquidity,
    handleBorrowSubmit,
  ]);

  const handleRepaySubmit = useCallback(
    async (inputAmount: BigNumber, isMaxAmount?: boolean) => {
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken!],
        amount: isMaxAmount
          ? inputAmount
              .multipliedBy(borrowInterestReserves)
              .decimalPlaces(0, BigNumber.ROUND_UP)
          : inputAmount,
        otherYTokens: borrowedYTokens, // only borrowed tokens
        tokenContract: asset.contractAddress,
        tokenId: asset.tokenId,
        isMaxAmount,
      };

      const prepareTransaction = {
        type: "Repay",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        status: Status.PENDING,
        opHash: "",
        timestamp: Date.now(),
      };

      const operation = await repay(tezos, accountPkh!, params);
      prepareTransaction.opHash = operation.opHash;
      addTransaction(prepareTransaction);
      updateToast({
        type: "info",
        render: `Request for ${getAssetName(
          asset
        )} Repay. You can follow your transaction in transaction history.`,
      });
      await operation.confirmation(1);
      updateTransactionStatus(prepareTransaction, allTransactions);
      updateToast({
        type: "info",
        render: `The ${getAssetName(asset)} Repay request was successful!`,
      });
    },
    [
      accountPkh,
      addTransaction,
      allTransactions,
      asset,
      borrowInterestReserves,
      borrowedYTokens,
      fabrica,
      priceFeedProxy,
      tezos,
      updateToast,
      updateTransactionStatus,
      yToken,
    ]
  );

  const handleRepay = useCallback(() => {
    setCreditProcessModalData({
      type: CreditProcessModalEnum.REPAY,
      maxAmount: !balanceLoading
        ? convertUnits(borrowed, STANDARD_PRECISION).lt(1)
          ? new BigNumber(0)
          : convertUnits(borrowed, STANDARD_PRECISION)
        : new BigNumber(0),
      asset: asset,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION),
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral).multipliedBy(1e2),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => {
        if (maxCollateral.eq(0)) {
          return new BigNumber(0);
        }

        return convertUnits(outstandingBorrow, COLLATERAL_PRECISION)
          .minus(
            input.multipliedBy(
              convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.precision)
            )
          )
          .div(convertUnits(maxCollateral, COLLATERAL_PRECISION))
          .multipliedBy(1e2);
      },
      isOpen: true,
      onSubmit: (input: BigNumber, isMaxAmount?: boolean) =>
        handleRepaySubmit(input, isMaxAmount),
      oraclePrice,
    });
  }, [
    setCreditProcessModalData,
    balanceLoading,
    borrowed,
    asset,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    handleRepaySubmit,
  ]);

  return (
    <TableDropdown
      yToken={yToken}
      asset={asset}
      theme={theme}
      className={className}
      balanceLabel="Wallet balance"
      balanceAmount={balanceData ?? new BigNumber(0)}
      balanceLoading={balanceLoading}
      tableName={tableName}
      firstButtonLabel="Borrow"
      handleFirstButtonClick={handleBorrow}
      secondButtonLabel="Repay"
      handleSecondButtonClick={handleRepay}
    />
  );
};
