import { TezosToolkit } from '@taquito/taquito';

import { batchify } from 'utils/dapp/batchify';
import { commonMethods, CommonParams } from './commonMethods';

type EnterMarketParams = Omit<CommonParams, 'otherYTokens' | 'amount' | 'tokenContract' | 'tokenId'>;

export const enterMarket = async (
  tezos: TezosToolkit,
  accountPkh: string,
  props: EnterMarketParams,
) => {
  const {
    fabricaContractAddress,
    yToken,
  } = props;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.enterMarket(yToken);

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(
    tezos,
    accountPkh,
    {
      ...props,
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
