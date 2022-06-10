import { ContractMethod, TezosToolkit, Wallet } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { WTEZ_CONTRACT } from "constants/defaults";
import { batchify } from "utils/dapp/helpers";
import { commonMethods, CommonParams } from "./commonMethods";

type WithdrawParams = Omit<CommonParams, "tokenId"> & {
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

  const postMethods: ContractMethod<Wallet>[] = [];
  if (params.tokenContract === WTEZ_CONTRACT) {
    const wtezContract = await tezos.wallet.at(WTEZ_CONTRACT);
    postMethods.push(
      wtezContract.methods.burn(
        accountPkh,
        accountPkh,
        isMaxAmount ? new BigNumber(0) : params.amount
      )
    );
  }

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(tezos, accountPkh, {
    ...params,
    fabricaContract,
    isAllowanceNeeded: false,
    method: mainMethod,
  });

  batchify(
    batch,
    [...methods, ...postMethods].map((method) =>
      method.toTransferParams({ storageLimit: 460 })
    )
  );

  return batch.send();
};
