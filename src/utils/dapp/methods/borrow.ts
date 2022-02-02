import { TezosToolkit } from "@taquito/taquito";

import { batchify } from "utils/dapp/helpers";
import { commonMethods, CommonParams } from "./commonMethods";

type BorrowParams = Omit<CommonParams, "tokenContract" | "tokenId">;

export const borrow = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: BorrowParams
) => {
  const { fabricaContractAddress, yToken, amount } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.borrow(yToken, amount);

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
