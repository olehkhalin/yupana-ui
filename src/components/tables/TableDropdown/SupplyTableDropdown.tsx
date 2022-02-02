import React, { useCallback, useMemo } from "react";
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
import {
  borrowedYTokensVar,
  contractAddressesVar,
  globalVariablesVar,
} from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";
import { supply, withdraw } from "utils/dapp/methods";
import { convertUnits } from "utils/helpers/amount";

import { TableDropdown, TableDropdownProps } from "./TableDropdown";

type SupplyDropdownProps = {
  yToken: number;
  asset: AssetType;
  collateralFactor: BigNumber;
  supply: BigNumber;
  wallet: BigNumber;
  isCollateral: boolean;
} & TableDropdownProps;

export const SupplyTableDropdown: React.FC<SupplyDropdownProps> = ({
  yToken,
  asset,
  collateralFactor,
  supply: supplied,
  wallet,
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
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: "The Asset Supply request was successful, please wait...",
      });
    },
    [
      accountPkh,
      asset.contractAddress,
      asset.tokenId,
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
      maxAmount: wallet,
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
    asset,
    collateralFactor,
    handleSupplySubmit,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    setCreditProcessModalData,
    wallet,
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
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: "The Asset Withdraw request was successful, please wait...",
      });
    },
    [accountPkh, fabrica, priceFeedProxy, tezos, updateToast, yToken]
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

    const maxAmount = isCollateral
      ? BigNumber.min(convertedSupplied, maxAmountInner)
      : new BigNumber(convertedSupplied);

    setCreditProcessModalData({
      type: CreditProcessModalEnum.WITHDRAW,
      maxAmount: maxAmount.lt(1) ? new BigNumber(0) : maxAmount,
      asset: asset,
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
