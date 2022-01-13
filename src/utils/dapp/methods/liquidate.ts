import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { batchify } from '../batchify';

import { commonMethods, CommonParams } from './commonMethods';

type Params = Pick<CommonParams, 'fabricaContractAddress' | 'proxyContractAddress' | 'otherYTokens'>;

type LiquidateParams = {
  borrowToken: number
  collateralToken: number
  borrower: string,
  amount: BigNumber
} & Params;

export const liquidate = async (
  tezos: TezosToolkit,
  accountPkh: string,
  params: LiquidateParams,
) => {
  const {
    fabricaContractAddress,
    borrowToken,
    collateralToken,
    borrower,
    amount,
  } = params;

  const fabricaContract = await tezos.wallet.at(fabricaContractAddress);
  const mainMethod = fabricaContract.methods.liquidate(
    borrowToken, collateralToken, borrower, amount,
  );

  const batch = tezos.wallet.batch([]);

  const methods = await commonMethods(
    tezos,
    accountPkh,
    {
      ...params,
      yToken: [collateralToken],
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
