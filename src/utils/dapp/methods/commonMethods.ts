import BigNumber from 'bignumber.js';
import {
  ContractAbstraction,
  ContractMethod,
  TezosToolkit,
  Wallet,
} from '@taquito/taquito';

import { getAllowance } from '../getAllowance';

const removeDuplicatedYToken = (arr: number[], value: number) => {
  if (!arr || !arr.length) {
    return [];
  }
  const newArr = [...arr];
  let i = 0;
  while (i < newArr.length) {
    if (newArr[i] === value) {
      newArr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return newArr;
};

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

  const preparedOtherYTokens = otherYTokens && otherYTokens.length
    ? removeDuplicatedYToken(otherYTokens, yToken[0])
    : [];

  const proxyContract = await tezos.wallet.at(proxyContractAddress);

  let methods: ContractMethod<Wallet>[] = [];

  const finalGetPriceArray = [yToken];
  if (preparedOtherYTokens && preparedOtherYTokens.length > 0) {
    finalGetPriceArray.push(preparedOtherYTokens);
  }
  const getPriceMethod = proxyContract.methods.getPrice(finalGetPriceArray);
  const updateInterestMethod = fabricaContract.methods.updateInterest(yToken);
  const updateAllInterestMethods = (preparedOtherYTokens && preparedOtherYTokens.length > 0)
    ? preparedOtherYTokens.map((tok) => (
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
