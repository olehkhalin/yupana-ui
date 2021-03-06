import BigNumber from "bignumber.js";

export type AssetType = {
  contractAddress: string;
  isFa2: boolean;
  tokenId?: number;
  decimals: number;
  name?: string | null;
  symbol?: string | null;
  thumbnail?: string | null;
};

export type AssetsResponseItem = {
  yToken: number;
  asset: AssetType;
  collateralFactor: BigNumber;
  interestUpdateTime: string;
  liquidationThreshold: BigNumber;
  rates: {
    borrowApy: BigNumber;
    borrowRate: BigNumber;
    supplyApy: BigNumber;
    utilizationRate: BigNumber;
  };
  exchangeRate: BigNumber;
  reserves: BigNumber;
  totalBorrowed: BigNumber;
  totalLiquid: BigNumber;
  totalSupply: BigNumber;
  borrow: BigNumber;
  borrowIndex: BigNumber;
  borrowWithInterest: BigNumber;
  borrowInterestReserves: BigNumber;
  supply: BigNumber;
  supplyWithInterest: BigNumber;
  isCollateral: boolean;
  numberOfSuppliers: number;
  numberOfBorrowers: number;
};

export type AssetsResponseData = AssetsResponseItem[];

type UseAssetsResponseData = {
  assets: AssetsResponseData;
  supplyAssets: AssetsResponseData;
  borrowAssets: AssetsResponseData;
} | null;

export type UseAssetsResponse = {
  data: UseAssetsResponseData;
  loading: boolean;
  error: boolean;
};

export type UseAssetsMetadataResponse = {
  data: AssetType[];
  loading: boolean;
  error: boolean;
};
