import BigNumber from "bignumber.js";
import { InMemoryCache, makeVar } from "@apollo/client";

import {
  ORACLE_PRICES_CONTRACT_FALLBACK,
  YUPANA_CONTRACT_FALLBACK,
} from "constants/defaults";

export type GlobalVariablesType = {
  maxCollateral: BigNumber;
  outstandingBorrow: BigNumber;
};

const globalVariablesInitial = {
  maxCollateral: new BigNumber(0),
  outstandingBorrow: new BigNumber(0),
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
      },
    },
  },
});
