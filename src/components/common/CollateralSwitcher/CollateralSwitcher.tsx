import React, { FC, useCallback, useMemo, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { BatchWalletOperation } from "@taquito/taquito/dist/types/wallet/batch-operation";
import BigNumber from "bignumber.js";

import { COLLATERAL_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { AssetType } from "types/asset";
import { convertUnits } from "utils/helpers/amount";
import { enterMarket, exitMarket } from "utils/dapp/methods";
import { borrowedYTokensVar, contractAddressesVar } from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";
import { getAssetName } from "utils/helpers/asset";
import { useAssets } from "hooks/useAssets";
import { useUserStats } from "hooks/useUserStats";
import { useUpdateToast } from "hooks/useUpdateToast";
import { Status, useTransactions } from "hooks/useTransactions";
import { Switcher } from "components/ui/Switcher";
import { useOraclePriceQuery } from "generated/graphql";

type SwitcherProps = {
  asset: AssetType;
  yToken: number;
  isCollateral: boolean;
  className?: string;
};

export const CollateralSwitcher: FC<SwitcherProps> = ({
  asset,
  yToken,
  isCollateral,
  className,
}) => {
  const { fabrica, priceFeedProxy } = useReactiveVar(contractAddressesVar);
  const borrowedYTokens = useReactiveVar(borrowedYTokensVar);
  const tezos = useTezos()!;
  const accountPkh = useAccountPkh()!;
  const [disabled, setDisabled] = useState(false);
  const { updateToast } = useUpdateToast();
  const { addTransaction } = useTransactions();
  const { data } = useAssets();
  const { data: userStats } = useUserStats();
  const { data: oraclePrice } = useOraclePriceQuery();

  const userTotalBorrow = useMemo(
    () =>
      userStats
        ? convertUnits(
            userStats.totalBorrowUsd,
            COLLATERAL_PRECISION
          ).decimalPlaces(6)
        : new BigNumber(0),
    [userStats]
  );

  const collateralWarningMessage = useMemo(() => {
    if (data && data.supplyAssets && data.supplyAssets.length) {
      const supplyWithCollateral = data.supplyAssets.filter(
        (el) => el.isCollateral
      );

      if (!supplyWithCollateral.length) {
        return "";
      }

      const withoutCurrentToken = supplyWithCollateral.filter(
        (el) => el.yToken !== yToken
      );

      if (
        supplyWithCollateral.length === 1 &&
        !withoutCurrentToken.length &&
        isCollateral
      ) {
        return "Asset cover the borrow. You can't disable the collateral.";
      }

      const someAssetCanCoverABorrow = withoutCurrentToken.some((el) => {
        return oraclePrice?.oraclePrice.some((orc) => {
          if (orc.ytoken === el.yToken) {
            let dec = 18;
            if (el.yToken === 1) {
              dec = 16;
            }

            const price = convertUnits(
              convertUnits(el.supply, STANDARD_PRECISION),
              el.asset.decimals
            ).multipliedBy(convertUnits(orc.price, dec));

            return price.multipliedBy(0.8).gte(userTotalBorrow);
          }
          return false;
        });
      });

      return !someAssetCanCoverABorrow
        ? "On the current asset, you cannot disable the collateral. Other assets can't cover the borrow."
        : "";
    }

    return "";
  }, [data, isCollateral, oraclePrice?.oraclePrice, userTotalBorrow, yToken]);

  const handleChange = useCallback(async () => {
    if (!disabled) {
      try {
        if (collateralWarningMessage) {
          return updateToast({
            type: "info",
            render: collateralWarningMessage,
          });
        }

        setDisabled(true);
        let operation: BatchWalletOperation;
        const params: {
          fabricaContractAddress: string;
          proxyContractAddress: string;
          yToken: number[];
          otherYTokens?: number[];
        } = {
          fabricaContractAddress: fabrica,
          proxyContractAddress: priceFeedProxy,
          yToken: [yToken],
        };

        const prepareTransaction = {
          type: !isCollateral ? "Enable collateral" : "Disabled collateral",
          name: getAssetName(asset),
          status: Status.PENDING,
          timestamp: Date.now(),
          opHash: "",
        };
        if (!isCollateral) {
          operation = await enterMarket(tezos, accountPkh, params);
        } else {
          params.otherYTokens = borrowedYTokens;
          operation = await exitMarket(tezos, accountPkh, params);
        }
        prepareTransaction.opHash = operation.opHash;
        addTransaction(prepareTransaction);
        updateToast({
          type: "info",
          render: `Request for update ${getAssetName(
            asset
          )} collateral status. You can follow your transaction in transaction history.`,
        });

        await operation.confirmation(1);
        updateToast({
          type: "info",
          render: `The ${getAssetName(
            asset
          )} collateral status changing request was successful, please wait...`,
        });
      } catch (e) {
        updateToast({
          type: "error",
          // @ts-ignore
          render: e.message,
        });
      } finally {
        setDisabled(false);
      }
    }
  }, [
    accountPkh,
    addTransaction,
    asset,
    borrowedYTokens,
    disabled,
    fabrica,
    isCollateral,
    collateralWarningMessage,
    priceFeedProxy,
    tezos,
    updateToast,
    yToken,
  ]);

  return (
    <Switcher
      active={isCollateral}
      handleChange={handleChange}
      disabled={disabled}
      className={className}
    />
  );
};
