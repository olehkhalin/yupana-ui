import React, { FC, useCallback, useMemo, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { BatchWalletOperation } from "@taquito/taquito/dist/types/wallet/batch-operation";

import { AssetType } from "types/asset";
import { enterMarket, exitMarket } from "utils/dapp/methods";
import { borrowedYTokensVar, contractAddressesVar } from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";
import { getAssetName } from "utils/helpers/asset";
import { useUpdateToast } from "hooks/useUpdateToast";
import { Status, useTransactions } from "hooks/useTransactions";
import { Switcher } from "components/ui/Switcher";
import { useCollateralWarningMessage } from "hooks/useCollateralWarningMessage";

type SwitcherProps = {
  asset: AssetType;
  yToken: number;
  isCollateral: boolean;
  className?: string;
};

enum CollateralEnum {
  DISABLED = "Disabled collateral",
  ENABLE = "Enable collateral",
}

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
  const { updateToast } = useUpdateToast();
  const { addTransaction } = useTransactions();
  const [loadingState, setLoadingState] = useState(false);
  const { isTransactionLoading, lastTransaction } = useTransactions();
  const [disabled, setDisabled] = useState(false);

  const loading = useMemo(() => {
    const isCurrentTransaction = lastTransaction?.name === getAssetName(asset);
    const correctType =
      lastTransaction?.type === CollateralEnum.DISABLED ||
      lastTransaction?.type === CollateralEnum.ENABLE;

    return (
      isCurrentTransaction &&
      correctType &&
      (loadingState || isTransactionLoading)
    );
  }, [
    asset,
    isTransactionLoading,
    lastTransaction?.name,
    lastTransaction?.type,
    loadingState,
  ]);

  const collateralWarningMessage = useCollateralWarningMessage(
    yToken,
    isCollateral
  );

  const handleChange = useCallback(async () => {
    if (collateralWarningMessage) {
      return updateToast({
        type: "error",
        render: collateralWarningMessage,
      });
    }

    if (!disabled) {
      try {
        setDisabled(true);
        setLoadingState(true);
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
        setLoadingState(false);
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
      disabled={disabled || loadingState || isTransactionLoading}
      loading={loadingState || loading}
      className={className}
    />
  );
};
