import { TokenMetadataInterface } from './token';

export interface YToken {
  yToken: number
}

export interface BorrowAsset {
  asset: TokenMetadataInterface & YToken
  price: number
  amountOfBorrowed: BigNumber
  maxLiquidate: BigNumber
  maxLiquidateInUsd: BigNumber
}

export interface SupplyAsset {
  asset: TokenMetadataInterface & YToken
  price: number
  amountOfSupplied: BigNumber
  maxBonus: BigNumber
}

export interface LiquidateData {
  borrowedAssetsName: string[]
  collateralAssetsName: string[]
  borrowerAddress: string
  totalBorrowed: number
  healthFactor: number
}

export interface LiquidateUser {
  liquidate: LiquidateData[]
  borrowedAssets: BorrowAsset[]
  collateralAssets: SupplyAsset[]
}
