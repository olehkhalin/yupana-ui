import { themeClass } from "components/ui/ProgressBar";
import { AssetType } from "types/asset";

export type SupplyLineBaseProps = {
  theme?: keyof typeof themeClass;
  className?: string;
};

export type SupplyLineWithDataProps = {
  asset: AssetType;
  percent: number;
} & SupplyLineBaseProps;
