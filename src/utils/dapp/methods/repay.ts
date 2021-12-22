import { TezosToolkit } from '@taquito/taquito';

import { batchify } from 'utils/dapp/batchify';
import { commonMethods, CommonParams } from './commonMethods';

type RepayProps = Omit<CommonParams, 'otherYTokens'>;

export const repay = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: RepayProps,
) => {
  const {
    fabricaContractAddress,
    yToken,
    amount,
  } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.repay(yToken, amount);

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
