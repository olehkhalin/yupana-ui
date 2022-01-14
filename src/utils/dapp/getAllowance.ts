import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';

import { LAMBDA_CONTRACT_ADDRESS } from 'constants/default';
import { loadContractForCallLambdaView } from './loadContractForCallLambdaView';

export const getAllowance = async (
  tezos: TezosToolkit,
  tokenAddress: string,
  owner: string,
  receiver: string,
): Promise<BigNumber> => {
  try {
    const contract = await loadContractForCallLambdaView(
      tezos,
      tokenAddress,
    );

    const value = await contract.views.getAllowance(owner, receiver).read(LAMBDA_CONTRACT_ADDRESS);

    if (!(value instanceof BigNumber) || !value.isFinite()) {
      return new BigNumber(0);
    }

    return value;
  } catch {
    return new BigNumber(0);
  }
};
