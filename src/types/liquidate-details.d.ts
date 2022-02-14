import BigNumber from "bignumber.js";

import { AssetType } from "./asset";

export type LiquidateDetailsBorrowedAssets = {
  yToken: number;
  asset: AssetType;
  price: BigNumber;
  amountOfBorrowed: BigNumber;
  maxLiquidate: BigNumber;
}[];

export type LiquidateDetailsCollateralAssets = {
  yToken: number;
  asset: AssetType;
  price: BigNumber;
  amountOfSupplied: BigNumber;
}[];

export type LiquidateDetailsResponseData = {
  borrowerAddress: string;
  totalBorrowUsd: BigNumber;
  healthFactor: BigNumber;
  borrowedAssets: LiquidateDetailsBorrowedAssets;
  collateralAssets: LiquidateDetailsCollateralAssets;
  liquidationIncentive: BigNumber;
};

export type LiquidateDetailsResponse = {
  data: LiquidateDetailsResponseData | null;
  loading: boolean;
  error: boolean;
};
