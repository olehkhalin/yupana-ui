import BigNumber from "bignumber.js";

import { COLLATERAL_PRECISION, STANDARD_PRECISION } from "constants/defaults";
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
  data: LiquidationPositionsQuery
) => {
  return data.user.map((el) => {
    const borrowedAssetsNames =
      el.borrowedAssets.length !== 0
        ? el.borrowedAssets.map((asset) =>
            getAssetName({
              name: asset.asset.tokens[0].name,
              symbol: asset.asset.tokens[0].symbol,
              contractAddress: asset.asset.contractAddress,
              isFa2: asset.asset.isFa2,
              tokenId: asset.asset.tokenId,
              decimals: asset.asset.tokens[0].decimals,
            })
          )
        : undefined;

    const collateralAssetsNames =
      el.collateralAssets.length !== 0
        ? el.collateralAssets.map((asset) =>
            getAssetName({
              name: asset.asset.tokens[0].name,
              symbol: asset.asset.tokens[0].symbol,
              contractAddress: asset.asset.contractAddress,
              isFa2: asset.asset.isFa2,
              tokenId: asset.asset.tokenId,
              decimals: asset.asset.tokens[0].decimals,
            })
          )
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
