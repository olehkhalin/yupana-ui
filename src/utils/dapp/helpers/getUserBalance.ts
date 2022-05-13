import { ChainIds, TezosToolkit } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { loadContract } from "./loadContract";

export const getUserBalance = async (
  tezos: TezosToolkit,
  contractAddress: string,
  tokenId: number | undefined,
  accountPkh: string,
  shouldThrowException?: boolean
): Promise<BigNumber> => {
  try {
    const contract = await loadContract(tezos, contractAddress);
    const chainId = await tezos.rpc.getChainId();

    if (tokenId === undefined) {
      const value = await contract.views
        .getBalance(accountPkh)
        .read(chainId as ChainIds);
      if (!(value instanceof BigNumber) || !value.isFinite()) {
        return new BigNumber(0);
      }
      return value;
    }

    const response = await contract.views
      .balance_of([{ owner: accountPkh, token_id: tokenId }])
      .read(chainId as ChainIds);

    return response[0].balance ?? new BigNumber(0);
  } catch (e) {
    if (shouldThrowException) {
      throw e;
    }
    return new BigNumber(0);
  }
};
