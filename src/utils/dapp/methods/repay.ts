import { TezosToolkit } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { batchify } from "utils/dapp/helpers";
import { commonMethods, CommonParams } from "./commonMethods";

type RepayProps = CommonParams & {
  isMaxAmount?: boolean;
};

export const repay = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: RepayProps
) => {
  const { fabricaContractAddress, yToken, amount, isMaxAmount } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const deadline = (
    (new Date().getTime() + 60 * 60 * 24 * 1000) /
    1000
  ).toFixed();
  const mainMethod = fabricaContract.methods.repay(
    yToken,
    isMaxAmount ? new BigNumber(0) : amount,
    deadline
  );

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(tezos, accountPkh, {
    ...params,
    fabricaContract,
    isAllowanceNeeded: true,
    method: mainMethod,
  });

  batchify(
    batch,
    methods.map((method) => method.toTransferParams({ storageLimit: 460 }))
  );

  return batch.send();
};
