import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { themeClasses } from "./MarketsCard";

export type MarketsCardBaseProps = {
  theme?: keyof typeof themeClasses;
  className?: string;
};

export type MarketsCardWithDataProps = {
  totalAmount: BigNumber;
  volume24h: BigNumber;
  numberOfMembers: number;
  assets: { asset: AssetType; volume24h: BigNumber }[];
} & MarketsCardBaseProps;
