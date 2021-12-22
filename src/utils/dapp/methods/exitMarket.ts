import { TezosToolkit } from '@taquito/taquito';

import { batchify } from 'utils/dapp/batchify';
import { commonMethods, CommonParams } from './commonMethods';

type ExitMarketParams = Omit<CommonParams, 'amount' | 'tokenContract' | 'tokenId'>;

export const exitMarket = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: ExitMarketParams,
) => {
  const {
    fabricaContractAddress,
    yToken,
  } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.exitMarket(yToken);

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(
    tezos,
    accountPkh,
    {
      ...params,
      fabricaContract,
      isAllowanceNeeded: false,
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
