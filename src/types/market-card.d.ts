import BigNumber from 'bignumber.js';
import { TokenMetadataInterface } from './token';

export type MarketCardInterface = {
  totalAmount: BigNumber | number
  volume24h: BigNumber | number
  numberOfMembers: number
  assets: (TokenMetadataInterface & {
    volume24h: number
  })[]
} | null;
