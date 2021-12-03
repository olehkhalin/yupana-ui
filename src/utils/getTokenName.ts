/* eslint-disable no-nested-ternary */
import { TokenMetadataWithBalanceInterface } from 'types/token';

import { shortize } from './getShortize';

export const getTokenName = ({
  name, symbol, id, address,
}: TokenMetadataWithBalanceInterface, fullName?: boolean, firstName?: boolean): string => (
  name && symbol && fullName
    ? `${symbol}${name ? ` / ${name}` : ''}`
    : (firstName ? name : symbol) || (
      (firstName ? symbol : name) || (`${
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
