import { TokenMetadataInterface } from './token';

export interface BorrowAsset {
  asset: TokenMetadataInterface
  price: number
  amountOfBorrowed: BigNumber
  maxLiquidate: BigNumber
}

export interface SupplyAsset {
  asset: TokenMetadataInterface
  price: number
  amountOfSupplied: BigNumber
  maxBonus: number
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
  suppliedAssets: SupplyAsset[]
}
