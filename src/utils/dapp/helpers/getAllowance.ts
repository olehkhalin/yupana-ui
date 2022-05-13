import { ChainIds, TezosToolkit } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { loadContract } from "./loadContract";

export const getAllowance = async (
  tezos: TezosToolkit,
  tokenAddress: string,
  owner: string,
  receiver: string
): Promise<BigNumber> => {
  try {
    const contract = await loadContract(tezos, tokenAddress);
    const chainId = await tezos.rpc.getChainId();

    const value = await contract.views
      .getAllowance(owner, receiver)
      .read(chainId as ChainIds);

    if (!(value instanceof BigNumber) || !value.isFinite()) {
      return new BigNumber(0);
    }

    return value;
  } catch {
    return new BigNumber(0);
  }
};
