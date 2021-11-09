import { TokenMetadataInterface } from './token';

export interface MarketCardInterface {
  totalSupply: number
  totalBorrow: number
  supplyVolume24h: number
  borrowVolume24h: number
  numberOfSuppliers: number
  numberOfBorrowers: number
  assets: (TokenMetadataInterface & {
    supplyVolume24h: number
    borrowVolume24h: number
  })[]
}
