import { Token } from '../graphql';

export const getPreparedPercentValue = (object: Token, key: string) => (
  // @ts-ignore
  object.asset.rates.length > 0 ? +(object.asset.rates[0][key]) * 100 : 0
);
