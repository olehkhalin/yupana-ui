/* eslint-disable no-nested-ternary */
import { TokenMetadataInterface } from 'types/token';

import { shortize } from './getShortize';

export const getTokenName = ({
  name, symbol, id, address,
}: TokenMetadataInterface, fullName?: boolean): string => (
  name && symbol && fullName
    ? `${symbol}${name ? ` / ${name}` : ''}`
    : symbol || (
      name || (`${
        address !== 'tez'
          ? shortize(address)
          : address
      }${
        id
          ? `_${id}`
          : ''
      }`
    ?? 'Token'))
);
