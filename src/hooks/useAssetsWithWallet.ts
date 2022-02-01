import { useCallback } from "react";
import BigNumber from "bignumber.js";
import useSWR from "swr";

import { UseAssetsResponse } from "types/asset";
import { useAccountPkh, useTezos } from "utils/dapp";
import { getUserBalance } from "utils/dapp/helpers";
import { useAssets } from "./useAssets";

export const useAssetsWithWallet = (): UseAssetsResponse => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();

  const { data, loading, error } = useAssets();

  const getWalletData = useCallback(async () => {
    if (!data || error) {
      return {
        data: null,
        loading,
        error,
      };
    }
    const assetsWithWallet = await Promise.all(
      data.assets.map(async (asset) => {
        let wallet = new BigNumber(0);
        if (!!accountPkh && !!tezos) {
          wallet =
            (await getUserBalance(
              tezos,
              asset.asset.contractAddress,
              asset.asset.tokenId,
              accountPkh
            )) ?? 0;
        }
        return {
          ...asset,
          wallet,
        };
      })
    );

    const supplyAssets = data.supplyAssets.map(
      (asset) => assetsWithWallet.find(({ yToken }) => yToken === asset.yToken)!
    );
    const borrowAssets = data.supplyAssets.map(
      (asset) => assetsWithWallet.find(({ yToken }) => yToken === asset.yToken)!
    );

    return {
      data: {
        assets: assetsWithWallet,
        supplyAssets,
        borrowAssets,
      },
      loading: false,
      error: false,
    };
  }, [accountPkh, data, error, loading, tezos]);

  const { data: assetsWithWallet, error: assetsWithWalletError } = useSWR(
    ["lending-assets-stats", accountPkh, data],
    getWalletData,
    {
      refreshInterval: 30000,
    }
  );

  // useOnBlock(tezos, [mutate]); // TODO: Research

  if (assetsWithWalletError) {
    return {
      data: null,
      loading: false,
      error: true,
    };
  }

  if (!assetsWithWallet) {
    return {
      data: null,
      loading: true,
      error: false,
    };
  }

  return assetsWithWallet;
};
