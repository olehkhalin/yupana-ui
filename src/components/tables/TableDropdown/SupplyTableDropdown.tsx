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
import { useUpdateToast } from "hooks/useUpdateToast";
import { useBalance } from "hooks/useBalance";
import { Status, useTransactions } from "hooks/useTransactions";
import {
  borrowedYTokensVar,
  contractAddressesVar,
  globalVariablesVar,
} from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";
import { supply, withdraw } from "utils/dapp/methods";
import { convertUnits } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";

import { TableDropdown, TableDropdownProps } from "./TableDropdown";

type SupplyDropdownProps = {
  yToken: number;
  asset: AssetType;
  collateralFactor: BigNumber;
  supply: BigNumber;
  totalLiquid: BigNumber;
  isCollateral: boolean;
  isCommon?: boolean;
  tableName: string;
} & TableDropdownProps;

export const SupplyTableDropdown: FC<SupplyDropdownProps> = ({
  yToken,
  asset,
  collateralFactor,
  supply: supplied,
  totalLiquid,
  isCollateral,
  theme,
  isCommon = false,
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
  const { data: balanceData, loading: balanceLoading } = useBalance(asset);
  const { addTransaction, updateTransactionStatus, allTransactions } =
    useTransactions();

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

  const handleSupplySubmit = useCallback(
    async (inputAmount: BigNumber) => {
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken],
        amount: inputAmount,
        tokenContract: asset.contractAddress,
        tokenId: asset.tokenId,
      };

      const prepareTransaction = {
        type: "Supply",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        status: Status.PENDING,
        opHash: "",
        timestamp: Date.now(),
      };

      const operation = await supply(tezos, accountPkh, params);
      prepareTransaction.opHash = operation.opHash;
      addTransaction(prepareTransaction);
      updateToast({
        type: "info",
        render: `Request for ${getAssetName(
          asset
        )} Supply. You can follow your transaction in transaction history.`,
      });
      await operation.confirmation(1);
      if (!isCollateral) {
        updateToast({
          type: "info",
          render: `Reminder, collateral for ${getAssetName(
            asset
          )} now is disabled!`,
        });
      }
      updateTransactionStatus(prepareTransaction, allTransactions);
      updateToast({
        type: "info",
        render: `The ${getAssetName(asset)} Supply request was successful!`,
      });
    },
    [
      accountPkh,
      addTransaction,
      allTransactions,
      asset,
      fabrica,
      isCollateral,
      priceFeedProxy,
      tezos,
      updateToast,
      updateTransactionStatus,
      yToken,
    ]
  );

  const handleSupply = useCallback(() => {
    setCreditProcessModalData({
      type: CreditProcessModalEnum.SUPPLY,
      maxAmount: balanceData ?? new BigNumber(0),
      asset: asset,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION),
      dynamicBorrowLimitFunc: (input: BigNumber) =>
        convertUnits(maxCollateral, COLLATERAL_PRECISION).plus(
          input
            .multipliedBy(
              convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.precision)
            )
            .multipliedBy(convertUnits(collateralFactor, STANDARD_PRECISION))
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

        return convertUnits(outstandingBorrow, COLLATERAL_PRECISION)
          .div(
            convertUnits(maxCollateral, COLLATERAL_PRECISION).plus(
              input
                .multipliedBy(
                  convertUnits(
                    oraclePrice.price,
                    ORACLE_PRICE_PRECISION
                  ).multipliedBy(oraclePrice.precision)
                )
                .multipliedBy(
                  convertUnits(collateralFactor, STANDARD_PRECISION)
                )
            )
          )
          .multipliedBy(1e2);
      },
      isOpen: true,
      onSubmit: (input: BigNumber) => handleSupplySubmit(input),
      oraclePrice,
    });
  }, [
    setCreditProcessModalData,
    balanceData,
    asset,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    collateralFactor,
    handleSupplySubmit,
  ]);

  const handleWithdrawSubmit = useCallback(
    async (inputAmount: BigNumber, isMaxAmount?: boolean) => {
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken],
        otherYTokens: borrowedYTokens,
        amount: inputAmount,
        isMaxAmount,
      };

      const prepareTransaction = {
        type: "Withdraw",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        status: Status.PENDING,
        opHash: "",
        timestamp: Date.now(),
      };

      const operation = await withdraw(tezos, accountPkh, params);
      prepareTransaction.opHash = operation.opHash;
      addTransaction(prepareTransaction);
      updateToast({
        type: "info",
        render: `Request for ${getAssetName(
          asset
        )} Withdraw. You can follow your transaction in transaction history.`,
      });
      await operation.confirmation(1);
      updateTransactionStatus(prepareTransaction, allTransactions);
      updateToast({
        type: "info",
        render: `The ${getAssetName(asset)} Withdraw request was successful!`,
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

  const handleWithdraw = () => {
    const maxAmountInner = convertUnits(
      maxCollateral.minus(outstandingBorrow),
      COLLATERAL_PRECISION
    )
      .div(
        convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION).multipliedBy(
          oraclePrice.precision
        )
      )
      .div(convertUnits(collateralFactor, STANDARD_PRECISION))
      .multipliedBy(new BigNumber(10).pow(asset.decimals));

    const convertedSupplied = convertUnits(supplied, STANDARD_PRECISION);

    const convertedTotalLiquid = convertUnits(totalLiquid, STANDARD_PRECISION);
    const availableToWithdraw = convertUnits(
      convertedTotalLiquid,
      asset.decimals
    );

    const maxAmount = isCollateral
      ? BigNumber.min(convertedSupplied, maxAmountInner)
      : new BigNumber(convertedSupplied);

    setCreditProcessModalData({
      type: CreditProcessModalEnum.WITHDRAW,
      maxAmount: maxAmount.lt(1) ? new BigNumber(0) : maxAmount,
      asset: asset,
      availableToWithdraw,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION),
      dynamicBorrowLimitFunc: (input: BigNumber) => {
        if (maxAmount.eq(0)) {
          return new BigNumber(0);
        }

        if (!isCollateral) {
          return convertUnits(maxCollateral, COLLATERAL_PRECISION);
        }

        return convertUnits(maxCollateral, COLLATERAL_PRECISION).minus(
          input
            .multipliedBy(
              convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.precision)
            )
            .multipliedBy(convertUnits(collateralFactor, STANDARD_PRECISION))
        );
      },
      borrowLimitUsed: maxCollateral.eq(0)
        ? new BigNumber(0)
        : outstandingBorrow.div(maxCollateral).multipliedBy(1e2),
      dynamicBorrowLimitUsedFunc: (input: BigNumber) => {
        if (maxCollateral.eq(0)) {
          return new BigNumber(0);
        }

        if (outstandingBorrow.eq(0) || input.eq(0) || !isCollateral) {
          return outstandingBorrow.div(maxCollateral).multipliedBy(1e2);
        }

        return convertUnits(outstandingBorrow, COLLATERAL_PRECISION)
          .div(
            convertUnits(maxCollateral, COLLATERAL_PRECISION).minus(
              input
                .multipliedBy(
                  convertUnits(
                    oraclePrice.price,
                    ORACLE_PRICE_PRECISION
                  ).multipliedBy(oraclePrice.precision)
                )
                .multipliedBy(
                  convertUnits(collateralFactor, STANDARD_PRECISION)
                )
            )
          )
          .multipliedBy(1e2);
      },
      isOpen: true,
      onSubmit: (input: BigNumber, isMaxAmount?: boolean) =>
        handleWithdrawSubmit(input, isMaxAmount),
      oraclePrice,
    });
  };

  return (
    <TableDropdown
      yToken={yToken}
      asset={asset}
      theme={theme}
      className={className}
      balanceLabel={isCommon ? "Supply balance" : "Wallet balance"}
      tableName={tableName}
      balanceAmount={
        isCommon
          ? convertUnits(supplied, STANDARD_PRECISION)
          : balanceData ?? new BigNumber(0)
      }
      balanceLoading={isCommon ? false : balanceLoading}
      firstButtonLabel="Supply"
      secondButtonLabel="Withdraw"
      handleFirstButtonClick={handleSupply}
      handleSecondButtonClick={handleWithdraw}
    />
  );
};
