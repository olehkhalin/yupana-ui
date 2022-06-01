import { ContractMethod, TezosToolkit, Wallet } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { WTEZ_CONTRACT } from "constants/defaults";
import { batchify } from "utils/dapp/helpers";

import { commonMethods, CommonParams } from "./commonMethods";

type SupplyParams = Omit<CommonParams, "otherYTokens">;

export const supply = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: SupplyParams
) => {
  const { fabricaContractAddress, yToken, amount } = params;

  const prevMethods: ContractMethod<Wallet>[] = [];

  if (params.tokenContract === WTEZ_CONTRACT) {
    const wtezContract = await tezos.wallet.at(WTEZ_CONTRACT);
    prevMethods.push(wtezContract.methods.mint(accountPkh, [["unit"]]));
  }

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.mint(
    yToken,
    amount,
    new BigNumber(1)
  );

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(tezos, accountPkh, {
    ...params,
    fabricaContract,
    isAllowanceNeeded: true,
    method: mainMethod,
  });

  batchify(batch, [
    ...prevMethods.map((method) =>
      method.toTransferParams({
        storageLimit: 460,
        amount: +params.amount!,
        mutez: true,
      })
    ),
    ...methods.map((method) => method.toTransferParams({ storageLimit: 460 })),
  ]);

  return batch.send();
};
