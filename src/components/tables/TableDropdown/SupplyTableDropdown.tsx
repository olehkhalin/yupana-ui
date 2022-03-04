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
  totalSupply: BigNumber;
  totalBorrowed: BigNumber;
  isCollateral: boolean;
} & TableDropdownProps;

export const SupplyTableDropdown: FC<SupplyDropdownProps> = ({
  yToken,
  asset,
  collateralFactor,
  supply: supplied,
  totalSupply,
  totalBorrowed,
  isCollateral,
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
  const { data: walletData } = useBalance(asset);
  const { addTransaction } = useTransactions();

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

  const handleSupplySubmit = useCallback(
    async (inputAmount: BigNumber) => {
      updateToast({
        type: "info",
        render: "Request for Asset Supply...",
      });
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken],
        amount: inputAmount,
        tokenContract: asset.contractAddress,
        tokenId: asset.tokenId,
      };

      const operation = await supply(tezos, accountPkh, params);
      addTransaction({
        type: "Supply",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        opHash: operation.opHash,
        status: Status.PENDING,
        timestamp: Date.now(),
      });
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: "The Asset Supply request was successful, please wait...",
      });
    },
    [
      accountPkh,
      addTransaction,
      asset,
      fabrica,
      priceFeedProxy,
      tezos,
      updateToast,
      yToken,
    ]
  );

  const handleSupply = useCallback(() => {
    setCreditProcessModalData({
      type: CreditProcessModalEnum.SUPPLY,
      maxAmount: walletData ?? new BigNumber(0),
      asset: asset,
      borrowLimit: convertUnits(maxCollateral, COLLATERAL_PRECISION),
      dynamicBorrowLimitFunc: (input: BigNumber) =>
        convertUnits(maxCollateral, COLLATERAL_PRECISION).plus(
          input
            .multipliedBy(
              convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.decimals)
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
                  ).multipliedBy(oraclePrice.decimals)
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
    walletData,
    asset,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    collateralFactor,
    handleSupplySubmit,
  ]);

  const handleWithdrawSubmit = useCallback(
    async (inputAmount: BigNumber, isMaxAmount?: boolean) => {
      updateToast({
        type: "info",
        render: "Request for Asset Withdraw...",
      });
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken],
        otherYTokens: borrowedYTokens,
        amount: inputAmount,
        isMaxAmount,
      };

      const operation = await withdraw(tezos, accountPkh, params);

      addTransaction({
        type: "Withdraw",
        amount: convertUnits(inputAmount, asset.decimals),
        name: getAssetName(asset),
        opHash: operation.opHash,
        timestamp: Date.now(),
        status: Status.PENDING,
      });
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: "The Asset Withdraw request was successful, please wait...",
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

  const handleWithdraw = () => {
    const maxAmountInner = convertUnits(
      maxCollateral.minus(outstandingBorrow),
      COLLATERAL_PRECISION
    )
      .div(
        convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION).multipliedBy(
          oraclePrice.decimals
        )
      )
      .div(convertUnits(collateralFactor, STANDARD_PRECISION))
      .multipliedBy(new BigNumber(10).pow(asset.decimals));

    const convertedSupplied = convertUnits(supplied, STANDARD_PRECISION);

    const convertedTotalSupplied = convertUnits(
      totalSupply,
      STANDARD_PRECISION
    );
    const convertedTotalBorrowed = convertUnits(
      totalBorrowed,
      STANDARD_PRECISION
    );
    const availableToWithdraw = convertUnits(
      convertedTotalSupplied.minus(convertedTotalBorrowed),
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

        return convertUnits(maxCollateral, COLLATERAL_PRECISION).minus(
          input
            .multipliedBy(
              convertUnits(
                oraclePrice.price,
                ORACLE_PRICE_PRECISION
              ).multipliedBy(oraclePrice.decimals)
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

        if (outstandingBorrow.eq(0) || input.eq(0)) {
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
                  ).multipliedBy(oraclePrice.decimals)
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
      balanceLabel="Supply balance"
      balanceAmount={supplied}
      firstButtonLabel="Supply"
      secondButtonLabel="Withdraw"
      handleFirstButtonClick={handleSupply}
      handleSecondButtonClick={handleWithdraw}
    />
  );
};
