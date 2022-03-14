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
  liquidity: BigNumber;
} & TableDropdownProps;

export const BorrowTableDropdown: FC<BorrowDropdownProps> = ({
  yToken,
  asset,
  borrow: borrowed,
  liquidity,
  theme,
  className,
}) => {
  const { setCreditProcessModalData } = useCreditProcessModal();
  const { data: oraclePrices } = useOraclePriceQuery();
  const { maxCollateral, outstandingBorrow } =
    useReactiveVar(globalVariablesVar);
  const borrowedYTokens = useReactiveVar(borrowedYTokensVar);
  const { fabrica, priceFeedProxy } = useReactiveVar(contractAddressesVar);
  const { updateToast } = useUpdateToast();
  const { addTransaction } = useTransactions();
  const { data: walletBalance, loading: loadingWalletBalance } =
    useBalance(asset);

  const tezos = useTezos()!;
  const accountPkh = useAccountPkh()!;

  const oraclePrice = useMemo(
    () =>
      oraclePrices
        ? oraclePrices.oraclePrice.find(({ ytoken }) => ytoken === yToken) ?? {
            price: new BigNumber(0),
            decimals: 0,
          }
        : {
            price: new BigNumber(0),
            decimals: 0,
          },
    [oraclePrices, yToken]
  );

  const handleBorrowSubmit = useCallback(
    async (inputAmount: BigNumber) => {
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken],
        otherYTokens: borrowedYTokens,
        amount: inputAmount,
      };

      const operation = await borrow(tezos, accountPkh!, params);
      addTransaction({
        type: "Borrow",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        opHash: operation.opHash,
        status: Status.PENDING,
        timestamp: Date.now(),
      });
      updateToast({
        type: "info",
        render: `Request for ${getAssetName(
          asset
        )} Borrow. You can follow your transaction in transaction history.`,
      });
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: `The ${getAssetName(asset)} Borrow request was successful!`,
      });
    },
    [
      accountPkh,
      addTransaction,
      asset,
      borrowedYTokens,
      fabrica,
      priceFeedProxy,
      tezos,
      updateToast,
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
              ).multipliedBy(oraclePrice.decimals)
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
              ).multipliedBy(oraclePrice.decimals)
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
          ? inputAmount.plus(
              new BigNumber(1).multipliedBy(
                new BigNumber(10).pow(asset?.decimals ?? 0)
              )
            )
          : inputAmount,
        otherYTokens: borrowedYTokens,
        tokenContract: asset.contractAddress,
        tokenId: asset.tokenId,
        isMaxAmount,
      };

      const operation = await repay(tezos, accountPkh!, params);
      addTransaction({
        type: "Repay",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        opHash: operation.opHash,
        status: Status.PENDING,
        timestamp: Date.now(),
      });
      updateToast({
        type: "info",
        render: `Request for ${getAssetName(
          asset
        )} Repay. You can follow your transaction in transaction history.`,
      });
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: `The ${getAssetName(asset)} Repay request was successful!`,
      });
    },
    [
      accountPkh,
      addTransaction,
      asset,
      borrowedYTokens,
      fabrica,
      priceFeedProxy,
      tezos,
      updateToast,
      yToken,
    ]
  );

  const pureWalletBalance = useMemo(
    () => convertUnits(walletBalance ?? new BigNumber(0), asset.decimals),
    [asset.decimals, walletBalance]
  );

  const handleRepay = useCallback(() => {
    setCreditProcessModalData({
      type: CreditProcessModalEnum.REPAY,
      maxAmount: !loadingWalletBalance
        ? convertUnits(borrowed, STANDARD_PRECISION).lt(1)
          ? new BigNumber(0)
          : convertUnits(borrowed, STANDARD_PRECISION)
        : new BigNumber(0),
      walletBalance: pureWalletBalance,
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
              ).multipliedBy(oraclePrice.decimals)
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
    loadingWalletBalance,
    borrowed,
    pureWalletBalance,
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
      balanceLabel="Borrow balance"
      balanceAmount={borrowed}
      firstButtonLabel="Borrow"
      handleFirstButtonClick={handleBorrow}
      secondButtonLabel="Repay"
      handleSecondButtonClick={handleRepay}
    />
  );
};
