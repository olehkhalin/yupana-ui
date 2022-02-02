import { TezosToolkit } from "@taquito/taquito";
import memoizee from "memoizee";
import BigNumber from "bignumber.js";

const getContractPure = (tezos: TezosToolkit, address: string) =>
  tezos.contract.at(address);

export const getContract = memoizee(getContractPure);

const getStoragePure = async (tezos: TezosToolkit, contractAddress: string) => {
  const contract = await getContract(tezos, contractAddress);
  return contract?.storage<any>();
};

export const getStorageInfo = memoizee(getStoragePure, { maxAge: 30000 });

export const getStorage = async (
  tezos: TezosToolkit,
  contract: string,
  accountPkh: string
) => {
  const storage = await getStorageInfo(tezos, contract);
  const ledger = storage.account_info;
  const val = await ledger.get(accountPkh);
  if (!val) return null;

  const amount = new BigNumber(val.amount);
  const former = new BigNumber(val.former);
  const { permit } = val;
  const reward = new BigNumber(val.reward);

  return {
    amount,
    former,
    permit,
    reward,
  };
};
