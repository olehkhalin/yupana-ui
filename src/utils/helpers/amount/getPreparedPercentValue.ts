import BigNumber from 'bignumber.js';

import { Asset } from 'generated/graphql';

export const getPreparedPercentValue = (object: Asset, key: string) => (
  object.rates.length > 0
    // @ts-ignore
    ? new BigNumber(object.rates[0][key]).div(1e18).multipliedBy(1e2)
    : new BigNumber(0)
);
