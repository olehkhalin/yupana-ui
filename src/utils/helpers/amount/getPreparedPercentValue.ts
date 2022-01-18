import BigNumber from 'bignumber.js';
import { STANDARD_PRECISION } from 'constants/default';
import { Asset } from 'generated/graphql';

import { precision } from './precision';

export const getPreparedPercentValue = (object: Asset, key: string) => (
  object.rates.length > 0
    // @ts-ignore
    ? new BigNumber(object.rates[0][key]).div(precision(STANDARD_PRECISION)).multipliedBy(1e2)
    : new BigNumber(0)
);
