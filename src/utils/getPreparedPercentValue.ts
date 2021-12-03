import BigNumber from 'bignumber.js';

import { Asset } from 'generated/graphql';

export const getPreparedPercentValue = (object: Asset, key: string) => (
  // @ts-ignore
  object.rates.length > 0 ? new BigNumber(object.rates[0][key]).div(1e18).multipliedBy(1e2) : 0
);
