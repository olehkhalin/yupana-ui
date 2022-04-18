import { TezosToolkit } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { batchify } from "utils/dapp/helpers";
import { commonMethods, CommonParams } from "./commonMethods";

type WithdrawParams = Omit<CommonParams, "tokenContract" | "tokenId"> & {
  isMaxAmount?: boolean;
};

export const withdraw = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: WithdrawParams
) => {
  const { fabricaContractAddress, yToken, amount, isMaxAmount } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.redeem(
    yToken,
    isMaxAmount ? new BigNumber(0) : amount,
    new BigNumber(1)
  );

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(tezos, accountPkh, {
    ...params,
    fabricaContract,
    isAllowanceNeeded: false,
    method: mainMethod,
  });

  batchify(
    batch,
    methods.map((method) => method.toTransferParams({ storageLimit: 460 }))
  );

  return batch.send();
};
