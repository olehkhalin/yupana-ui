import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';

import { LAMBDA_CONTRACT_ADDRESS } from 'constants/default';
import { loadContractForCallLambdaView } from './loadContractForCallLambdaView';

export const getUserBalance = async (
  tezos: TezosToolkit,
  contractAddress: string,
  tokenId: number | undefined,
  accountPkh: string,
  shouldThrowException?: boolean,
): Promise<BigNumber> => {
  try {
    const contract = await loadContractForCallLambdaView(
      tezos,
      contractAddress,
    );

    if (tokenId === undefined) {
      const value = await contract.views.getBalance(accountPkh).read(LAMBDA_CONTRACT_ADDRESS);
      if (!(value instanceof BigNumber) || !value.isFinite()) {
        return new BigNumber(0);
      }
      return value;
    }

    const response = await contract.views
      .balance_of([{ owner: accountPkh, token_id: tokenId }])
      .read(LAMBDA_CONTRACT_ADDRESS);

    return response[0].balance ?? new BigNumber(0);
  } catch (e) {
    if (shouldThrowException) {
      throw e;
    }
    return new BigNumber(0);
  }
};
