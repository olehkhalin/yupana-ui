import useSWR from "swr";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { useAccountPkh, useTezos } from "utils/dapp";
import { getUserBalance } from "utils/dapp/helpers";

export const useBalance = (asset: AssetType) => {
  const tezos = useTezos();
  const accountPkh = useAccountPkh();
  const getWalletData = async () => {
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
  };
  const { data: assetWalletAmount, error: assetWalletAmountError } = useSWR(
    ["asset-wallet-amount", accountPkh, asset.contractAddress, asset.tokenId],
    getWalletData
  );

  return {
    data: assetWalletAmount,
    loading: !assetWalletAmountError && !assetWalletAmount,
    error: assetWalletAmountError,
  };
};
