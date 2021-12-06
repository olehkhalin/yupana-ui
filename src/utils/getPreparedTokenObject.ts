import { Asset } from 'generated/graphql';

export const getPreparedTokenObject = (object: Asset) => (
  {
    address: object.contractAddress,
    name: object.tokens[0].name,
    symbol: object.tokens[0].symbol,
    thumbnailUri: object.tokens[0].thumbnail,
    decimals: object.tokens[0].decimals,
    id: object.isFa2 ? object.tokenId : null,
  }
);
