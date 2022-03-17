import { useCallback, useState } from "react";
import constate from "constate";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";

type Balance = {
  asset: AssetType;
  balance: BigNumber;
};

export const [AssetsBalanceProvider, useAssetsBalance] = constate(() => {
  const [balance, setBalance] = useState<Balance[] | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);

  const updateAssetsBalance = useCallback((params: Balance[]) => {
    setBalance(params);
  }, []);

  return {
    balance,
    updateAssetsBalance,
    balanceLoading,
    setBalanceLoading,
  };
});
