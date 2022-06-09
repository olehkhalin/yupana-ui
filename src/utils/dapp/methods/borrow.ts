import { ContractMethod, TezosToolkit, Wallet } from "@taquito/taquito";

import { WTEZ_CONTRACT } from "constants/defaults";
import { batchify } from "utils/dapp/helpers";
import { commonMethods, CommonParams } from "./commonMethods";

type BorrowParams = Omit<CommonParams, "tokenId">;

export const borrow = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: BorrowParams
) => {
  const { fabricaContractAddress, yToken, amount } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const deadline = (
    (new Date().getTime() + 60 * 60 * 24 * 1000) /
    1000
  ).toFixed();
  const mainMethod = fabricaContract.methods.borrow(yToken, amount, deadline);

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(tezos, accountPkh, {
    ...params,
    fabricaContract,
    isAllowanceNeeded: false,
    method: mainMethod,
  });

  const postMethods: ContractMethod<Wallet>[] = [];
  if (params.tokenContract === WTEZ_CONTRACT) {
    const wtezContract = await tezos.wallet.at(WTEZ_CONTRACT);
    postMethods.push(
      wtezContract.methods.burn(accountPkh, accountPkh, params.amount)
    );
  }

  batchify(
    batch,
    [...methods, ...postMethods].map((method) =>
      method.toTransferParams({ storageLimit: 460 })
    )
  );

  return batch.send();
};
