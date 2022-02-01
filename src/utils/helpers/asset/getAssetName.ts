import { AssetType } from "types/asset";

import { shortize } from "./getShortize";

export const getAssetName = (
  { name, symbol, tokenId, contractAddress }: AssetType,
  fullName?: boolean,
  firstName?: boolean
): string => {
  if (name && symbol && fullName) {
    if (name) {
      return `${name} (${symbol})`;
    } else {
      return symbol;
    }
  }
  return (
    (firstName ? name : symbol) ||
    (firstName ? symbol : name) ||
    (`${
      contractAddress !== "tez" ? shortize(contractAddress) : contractAddress
    }${tokenId ? `_${tokenId}` : ""}` ??
      "Asset")
  );
};
