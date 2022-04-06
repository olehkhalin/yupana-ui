import { TezosToolkit, WalletContract } from "@taquito/taquito";
import memoize from "memoizee";

export const loadContract = memoize(fetchContract, {
  maxAge: 100,
});

export function fetchContract(
  tezos: TezosToolkit,
  address: string,
  walletAPI = true
): Promise<WalletContract> {
  return walletAPI
    ? tezos.wallet.at(address)
    : (tezos.contract.at(address) as any);
}
