import React, { FC, useCallback, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { BatchWalletOperation } from "@taquito/taquito/dist/types/wallet/batch-operation";

import { useUpdateToast } from "hooks/useUpdateToast";
import { enterMarket, exitMarket } from "utils/dapp/methods";
import { borrowedYTokensVar, contractAddressesVar } from "utils/cache";
import { useAccountPkh, useTezos } from "utils/dapp";
import { Switcher } from "components/ui/Switcher";

type SwitcherProps = {
  yToken: number;
  isCollateral: boolean;
  className?: string;
};

export const CollateralSwitcher: FC<SwitcherProps> = ({
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

  const handleChange = useCallback(async () => {
    if (!disabled) {
      try {
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

        updateToast({
          type: "info",
          render: "Request for update Asset collateral status...",
        });

        if (!isCollateral) {
          operation = await enterMarket(tezos, accountPkh, params);
        } else {
          params.otherYTokens = borrowedYTokens;
          operation = await exitMarket(tezos, accountPkh, params);
        }
        await operation.confirmation(1);

        updateToast({
          type: "info",
          render:
            "The Asset collateral status changing request was successful, please wait...",
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
    borrowedYTokens,
    disabled,
    fabrica,
    isCollateral,
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
