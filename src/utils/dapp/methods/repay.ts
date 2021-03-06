import { ContractMethod, TezosToolkit, Wallet } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { WTEZ_CONTRACT } from "constants/defaults";
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

  const prevMethods: ContractMethod<Wallet>[] = [];

  if (params.tokenContract === WTEZ_CONTRACT) {
    const wtezContract = await tezos.wallet.at(WTEZ_CONTRACT);
    prevMethods.push(wtezContract.methods.mint(accountPkh, [["unit"]]));
  }

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

  const postMethods: ContractMethod<Wallet>[] = [];
  if (params.tokenContract === WTEZ_CONTRACT && isMaxAmount) {
    const wtezContract = await tezos.wallet.at(WTEZ_CONTRACT);
    postMethods.push(
      wtezContract.methods.burn(accountPkh, accountPkh, new BigNumber(0))
    );
  }

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
    ...[...methods, ...postMethods].map((method) =>
      method.toTransferParams({ storageLimit: 460 })
    ),
  ]);

  return batch.send();
};
