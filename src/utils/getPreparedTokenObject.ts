import { Token } from '../graphql';

export const getPreparedTokenObject = (object: Token) => (
  {
    address: object.asset.contractAddress,
    name: object.name,
    symbol: object.symbol,
    thumbnailUri: object.thumbnail,
    id: object.asset.isFa2 ? object.asset.tokenId : null,
  }
);
