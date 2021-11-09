import { TokenMetadataInterface } from 'types/token';

import { getSlice } from './getSlice';
import { getTokenName } from './getTokenName';

export const getSliceTokenName = (token: TokenMetadataInterface) => (
  getSlice(getTokenName(token), 5)
);
