import BigNumber from 'bignumber.js';
import {
  ContractAbstraction,
  ContractMethod,
  TezosToolkit,
  Wallet,
} from '@taquito/taquito';

import { getAllowance } from '../getAllowance';

export type CommonParams = {
  fabricaContractAddress: string
  proxyContractAddress: string
  yToken: number[]
  otherYTokens?: number[]
  amount?: BigNumber
  tokenContract?: string
  tokenId?: string | number | null
};

type WrapperParams = CommonParams & {
  fabricaContract: ContractAbstraction<Wallet>
  isAllowanceNeeded?: boolean
  method: ContractMethod<Wallet>
};

export const commonMethods = async (
  tezos: TezosToolkit,
  accountPkh: string,
  commonParams: WrapperParams,
) => {
  const {
    fabricaContract,
    fabricaContractAddress,
    proxyContractAddress,
    yToken,
    otherYTokens,
    amount,
    tokenContract: tokenAddress,
    tokenId,
    isAllowanceNeeded,
    method,
  } = commonParams;

  const proxyContract = await tezos.wallet.at(proxyContractAddress);

  let methods: ContractMethod<Wallet>[] = [];

  const finalGetPriceArray = [yToken];
  if (otherYTokens && otherYTokens.length > 0) {
    finalGetPriceArray.push(otherYTokens);
  }
  const getPriceMethod = proxyContract.methods.getPrice(finalGetPriceArray);
  const updateInterestMethod = fabricaContract.methods.updateInterest(yToken);
  const updateAllInterestMethods = (otherYTokens && otherYTokens.length > 0)
    ? otherYTokens.map((tok) => (
      fabricaContract.methods.updateInterest(tok)
    ))
    : [];

  const contractMethods = [
    getPriceMethod,
    updateInterestMethod,
    ...updateAllInterestMethods,
    method,
  ];

  if (isAllowanceNeeded && amount && tokenAddress) {
    const tokenIsFA2 = tokenId !== undefined;

    const tokenContract = await tezos.wallet.at(tokenAddress);

    if (tokenIsFA2) {
      const addOperatorMethod = tokenContract.methods
        .update_operators([
          {
            add_operator: {
              owner: accountPkh,
              operator: fabricaContractAddress,
              token_id: tokenId,
            },
          },
        ]);
      const removeOperatorMethod = tokenContract.methods
        .update_operators([
          {
            remove_operator: {
              owner: accountPkh,
              operator: fabricaContractAddress,
              token_id: tokenId,
            },
          },
        ]);
      methods = [addOperatorMethod, ...contractMethods, removeOperatorMethod];
    } else {
      const resetApproveMethod = tokenContract.methods.approve(fabricaContractAddress, 0);
      const approveMethod = tokenContract.methods.approve(fabricaContractAddress, amount);

      const alreadyPresentAllowance = await getAllowance(
        tezos,
        tokenAddress,
        accountPkh,
        fabricaContractAddress,
      );
      if (alreadyPresentAllowance.gte(amount)) {
        methods = [...contractMethods];
      } else if (alreadyPresentAllowance.gt(0)) {
        methods = [resetApproveMethod, approveMethod, ...contractMethods];
      } else {
        methods = [approveMethod, ...contractMethods];
      }
    }
  } else {
    methods = [...contractMethods];
  }

  return methods;
};
