import { ContractMethod, TezosToolkit, Wallet } from "@taquito/taquito";
import BigNumber from "bignumber.js";

import { WTEZ_CONTRACT } from "constants/defaults";
import { batchify } from "utils/dapp/helpers";
import { commonMethods, CommonParams } from "./commonMethods";

type Params = Pick<
  CommonParams,
  | "fabricaContractAddress"
  | "proxyContractAddress"
  | "otherYTokens"
  | "tokenContract"
>;

type LiquidateParams = {
  borrowToken: number;
  collateralToken: number;
  borrower: string;
  amount: BigNumber;
} & Params;

export const liquidate = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: LiquidateParams
) => {
  const {
    fabricaContractAddress,
    borrowToken,
    collateralToken,
    borrower,
    amount,
  } = params;

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
  const mainMethod = fabricaContract.methods.liquidate(
    borrowToken,
    collateralToken,
    borrower,
    amount,
    new BigNumber(1),
    deadline
  );

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(tezos, accountPkh, {
    ...params,
    yToken: [collateralToken],
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
