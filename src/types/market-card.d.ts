import { TokenMetadataInterface } from './token';

export interface MarketCardInterface {
  totalAmount: number
  volume24h: number
  numberOfMembers: number
  assets: (TokenMetadataInterface & {
    volume24h: number
  })[]
}
