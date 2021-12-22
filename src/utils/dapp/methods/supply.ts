import { TezosToolkit } from '@taquito/taquito';

import { batchify } from 'utils/dapp/batchify';
import { commonMethods, CommonParams } from './commonMethods';

type SupplyParams = Omit<CommonParams, 'otherYTokens'>;

export const supply = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: SupplyParams,
) => {
  const {
    fabricaContractAddress,
    yToken,
    amount,
  } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.mint(yToken, amount);

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(
    tezos,
    accountPkh,
    {
      ...params,
      fabricaContract,
      isAllowanceNeeded: true,
      method: mainMethod,
    },
  );

  batchify(
    batch,
    methods.map((method) => (
      method.toTransferParams({ storageLimit: 460 })
    )),
  );

  return batch.send();
};
