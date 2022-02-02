import React, { useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import { useReactiveVar } from "@apollo/client";

import { useOraclePriceQuery } from "generated/graphql";
import {
  COLLATERAL_PRECISION,
  ORACLE_PRICE_PRECISION,
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
import { borrow, repay } from "utils/dapp/methods";
import { convertUnits } from "utils/helpers/amount";

import { TableDropdown, TableDropdownProps } from "./TableDropdown";

type BorrowDropdownProps = {
  yToken: number;
  asset: AssetType;
  borrow: BigNumber;
  liquidity: BigNumber;
} & TableDropdownProps;

export const BorrowTableDropdown: React.FC<BorrowDropdownProps> = ({
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
      updateToast({
        type: "info",
        render: "Request for Asset Borrow...",
      });
      const params = {
        fabricaContractAddress: fabrica,
        proxyContractAddress: priceFeedProxy,
        yToken: [yToken],
        otherYTokens: borrowedYTokens,
        amount: inputAmount,
      };

      const operation = await borrow(tezos, accountPkh!, params);
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: "The Asset Supply request was successful, please wait...",
      });
    },
    [accountPkh, fabrica, priceFeedProxy, tezos, updateToast, yToken]
  );

  const handleBorrow = useCallback(() => {
    setCreditProcessModalData({
      type: CreditProcessModalEnum.BORROW,
      maxAmount: BigNumber.min(
        liquidity,
        convertUnits(
          maxCollateral.minus(outstandingBorrow),
          COLLATERAL_PRECISION
        )
          .div(
            convertUnits(
              oraclePrice.price,
              ORACLE_PRICE_PRECISION
            ).multipliedBy(oraclePrice.decimals)
          )
          .multipliedBy(new BigNumber(10).pow(asset.decimals))
      ),
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
    liquidity,
    maxCollateral,
    outstandingBorrow,
    oraclePrice,
    asset,
    handleBorrowSubmit,
  ]);

  const handleRepaySubmit = useCallback(
    async (inputAmount: BigNumber, isMaxAmount?: boolean) => {
      updateToast({
        type: "info",
        render: "Request for Asset Repay...",
      });
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
      await operation.confirmation(1);
      updateToast({
        type: "info",
        render: "The Asset Repay request was successful, please wait...",
      });
    },
    [
      accountPkh,
      asset.contractAddress,
      asset?.decimals,
      asset.tokenId,
      fabrica,
      priceFeedProxy,
      tezos,
      updateToast,
      yToken,
    ]
  );

  const handleRepay = useCallback(() => {
    setCreditProcessModalData({
      type: CreditProcessModalEnum.REPAY,
      maxAmount: borrowed.lt(1) ? new BigNumber(0) : borrowed,
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
      balanceLabel="Borrow balance"
      balanceAmount={borrowed}
      firstButtonLabel="Borrow"
      handleFirstButtonClick={handleBorrow}
      secondButtonLabel="Repay"
      handleSecondButtonClick={handleRepay}
    />
  );
};
