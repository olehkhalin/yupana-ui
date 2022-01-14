import { TezosToolkit } from '@taquito/taquito';
import memoizee from 'memoizee';

import { lambdaSigner } from './lambdaSigner';
import { michelEncoder } from './dapp';
import { getContract } from './getStorage';

async function loadContractForCallLambdaViewPure(
  tezos: TezosToolkit,
  contractAddress: string,
) {
  const lambdaTezos = new TezosToolkit(tezos.rpc);
  lambdaTezos.setSignerProvider(lambdaSigner);
  lambdaTezos.setPackerProvider(michelEncoder);

  const contract: any = await getContract(lambdaTezos, contractAddress);
  return contract;
}

export const loadContractForCallLambdaView = memoizee(loadContractForCallLambdaViewPure);
