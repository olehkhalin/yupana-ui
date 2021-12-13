import { Asset } from 'generated/graphql';

export const getPreparedTokenObject = (object: Asset) => (
  {
    address: object.contractAddress,
    name: object.tokens[0].name ? object.tokens[0].name : 'Name',
    symbol: object.tokens[0].symbol ? object.tokens[0].symbol : 'Symbol',
    thumbnailUri: object.tokens[0].thumbnail ? object.tokens[0].thumbnail : null,
    decimals: object.tokens[0].decimals,
    id: object.isFa2 ? object.tokenId : null,
  }
);
