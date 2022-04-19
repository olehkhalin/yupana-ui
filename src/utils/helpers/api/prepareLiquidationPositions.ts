import BigNumber from "bignumber.js";

import { COLLATERAL_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { AssetType } from "types/asset";
import { LiquidationPositionsQuery } from "generated/graphql";
import { getAssetName } from "utils/helpers/asset";
import { convertUnits } from "utils/helpers/amount";

export type LiquidationPositionsType = {
  borrowerAddress: string;
  totalBorrowed: BigNumber;
  borrowedAssetsNames?: string[];
  collateralAssetsNames?: string[];
  healthFactor: BigNumber;
};

export const prepareLiquidationPositions = (
  data: LiquidationPositionsQuery,
  assetsMetadata: AssetType[]
) => {
  return data.user.map((el) => {
    const borrowedAssetsNames =
      el.borrowedAssets.length !== 0
        ? el.borrowedAssets.map((asset) => {
            const metadata = assetsMetadata.find(
              ({ contractAddress }) =>
                contractAddress === asset.asset.contractAddress
            )!;

            return getAssetName({
              name: metadata.name,
              symbol: metadata.symbol,
              contractAddress: metadata.contractAddress,
              isFa2: metadata.isFa2,
              tokenId: metadata.tokenId,
              decimals: metadata.decimals,
            });
          })
        : undefined;

    const collateralAssetsNames =
      el.collateralAssets.length !== 0
        ? el.collateralAssets.map((asset) => {
            const metadata = assetsMetadata.find(
              ({ contractAddress }) =>
                contractAddress === asset.asset.contractAddress
            )!;

            return getAssetName({
              name: metadata.name,
              symbol: metadata.symbol,
              contractAddress: metadata.contractAddress,
              isFa2: metadata.isFa2,
              tokenId: metadata.tokenId,
              decimals: metadata.decimals,
            });
          })
        : undefined;

    return {
      borrowerAddress: el.address,
      totalBorrowed: convertUnits(el.outstandingBorrow, COLLATERAL_PRECISION),
      borrowedAssetsNames,
      collateralAssetsNames,
      healthFactor: new BigNumber(1)
        .div(convertUnits(el.liquidationRatio, STANDARD_PRECISION))
        .multipliedBy(1e2),
    };
  }, []);
};
