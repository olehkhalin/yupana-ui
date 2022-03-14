import BigNumber from "bignumber.js";
import { InMemoryCache, makeVar } from "@apollo/client";

import {
  ORACLE_PRICES_CONTRACT_FALLBACK,
  YUPANA_CONTRACT_FALLBACK,
} from "constants/defaults";

export type GlobalVariablesType = {
  maxCollateral: BigNumber;
  liquidationCollateral: BigNumber;
  outstandingBorrow: BigNumber;
  totalUsdSupply: BigNumber;
  totalUsdBorrowed: BigNumber;
  isLoaded: boolean;
};

const globalVariablesInitial = {
  maxCollateral: new BigNumber(0),
  liquidationCollateral: new BigNumber(0),
  outstandingBorrow: new BigNumber(0),
  totalUsdSupply: new BigNumber(0),
  totalUsdBorrowed: new BigNumber(0),
  isLoaded: false,
};

export const globalVariablesVar = makeVar<GlobalVariablesType>(
  globalVariablesInitial
);

export type ContractAddressesType = {
  fabrica: string;
  priceFeedProxy: string;
};

const contractAddressesInitial = {
  fabrica: YUPANA_CONTRACT_FALLBACK,
  priceFeedProxy: ORACLE_PRICES_CONTRACT_FALLBACK,
};

export const contractAddressesVar = makeVar<ContractAddressesType>(
  contractAddressesInitial
);

export type BorrowedYTokensType = number[];

const borrowedYTokensInitial: BorrowedYTokensType = [];

export const borrowedYTokensVar = makeVar<BorrowedYTokensType>(
  borrowedYTokensInitial
);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        globalVariables: {
          read() {
            return globalVariablesVar();
          },
        },
        contractAddresses: {
          read() {
            return contractAddressesVar();
          },
        },
        borrowedYTokens: {
          read() {
            return borrowedYTokensVar();
          },
        },
      },
    },
  },
});
