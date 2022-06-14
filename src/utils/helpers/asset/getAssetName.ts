import { AssetType } from "types/asset";

import { WTEZ_CONTRACT } from "constants/defaults";
import { shortize } from "./getShortize";

export const getAssetName = (
  { name, symbol, tokenId, contractAddress }: AssetType,
  fullName?: boolean,
  firstName?: boolean
): string => {
  if (name && symbol && fullName) {
    if (contractAddress === WTEZ_CONTRACT) {
      return "Tezos (TEZ)";
    }
    if (name) {
      return `${name} (${symbol})`;
    }
    return symbol;
  }
  return contractAddress === WTEZ_CONTRACT
    ? "TEZ"
    : (firstName ? name : symbol) ||
        (firstName ? symbol : name) ||
        (`${
          contractAddress !== "tez"
            ? shortize(contractAddress)
            : contractAddress
        }${tokenId ? `_${tokenId}` : ""}` ??
          "Asset");
};
