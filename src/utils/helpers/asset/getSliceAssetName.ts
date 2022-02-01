import { AssetType } from "types/asset";

import { getSlice } from "./getSlice";
import { getAssetName } from "./getAssetName";

export const getSliceAssetName = (asset: AssetType) =>
  getSlice(getAssetName(asset), 5);
