import { useCallback, useEffect, useState } from "react";
import constate from "constate";
import BigNumber from "bignumber.js";
import useSWR from "swr";

import { AssetType } from "types/asset";
import { getAssetName } from "utils/helpers/asset";
import { useAccountPkh, useTezos } from "utils/dapp";
import { getUserBalance } from "utils/dapp/helpers";

import { useAssets } from "./useAssets";

type Balance = {
  asset: AssetType;
  balance: BigNumber;
};

export const [AssetsBalanceProvider, useAssetsBalance] = constate(() => {
  const accountPkh = useAccountPkh();
  const tezos = useTezos();
  const [balance, setBalance] = useState<Balance[] | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const { data: assetsData } = useAssets();

  const getBalance = useCallback(
    async (asset: AssetType) => {
      let wallet = new BigNumber(0);
      if (!!accountPkh && !!tezos) {
        wallet =
          (await getUserBalance(
            tezos,
            asset.contractAddress,
            asset.tokenId,
            accountPkh
          )) ?? 0;
      }
      return wallet;
    },
    [accountPkh, tezos]
  );

  const getAssetsBalance = useCallback(() => {
    return Promise.all(
      assetsData
        ? assetsData?.assets.map(async ({ asset }) => {
            const balance = await getBalance(asset);
            return {
              asset: asset,
              balance,
            };
          })
        : []
    );
  }, [assetsData, getBalance]);

  const { data: balanceData, error: balanceError } = useSWR(
    ["assets-balance", accountPkh, assetsData],
    getAssetsBalance
  );

  useEffect(() => {
    if (balanceData && balanceData.length && !balanceError) {
      setBalance(balanceData);
      setBalanceLoading(false);
    } else if (
      (balanceData === null || balanceData === undefined) &&
      !balanceError
    ) {
      setBalanceLoading(true);
    }
  }, [balanceData, assetsData, setBalance, setBalanceLoading, balanceError]);

  const getBalanceByCurrentAsset = useCallback(
    (asset: AssetType) => {
      if (balance && balance.length) {
        const currentAsset = balance.find(
          (el) => getAssetName(el.asset) === getAssetName(asset)
        );

        return currentAsset ? currentAsset.balance : new BigNumber(0);
      }

      return new BigNumber(0);
    },
    [balance]
  );

  return {
    balance,
    balanceLoading,
    setBalanceLoading,
    getBalanceByCurrentAsset,
  };
});
