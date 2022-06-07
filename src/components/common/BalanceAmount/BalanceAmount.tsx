import React, { FC } from "react";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { WTEZ_CONTRACT } from "constants/defaults";
import { AssetType } from "types/asset";
import { useBalance } from "hooks/useBalance";
import { convertUnits } from "utils/helpers/amount";
import { getSliceAssetName } from "utils/helpers/asset";
import {
  Preloader,
  PreloaderProps,
  PreloaderThemes,
} from "components/ui/Preloader";
import {
  PrettyAmount,
  PrettyAmountProps,
} from "components/common/PrettyAmount";

type BalanceAmountProps = {
  asset: AssetType;
  preloaderTheme?: PreloaderThemes;
  className?: string;
  preloaderClassName?: string;
  withTez?: boolean;
} & Omit<PrettyAmountProps, "amount"> &
  PreloaderProps;

export const BalanceAmount: FC<BalanceAmountProps> = ({
  asset,
  preloaderTheme = "primary",
  className,
  preloaderClassName,
  withTez = false,
  ...props
}) => {
  const { data, loading } = useBalance(asset);

  if (loading) {
    return (
      <Preloader
        theme={preloaderTheme}
        className={cx(className, preloaderClassName)}
        {...props}
      />
    );
  }

  return (
    <PrettyAmount
      amount={convertUnits(data ?? new BigNumber(0), asset.decimals, true)}
      currency={
        withTez && asset.contractAddress === WTEZ_CONTRACT
          ? "TEZ"
          : getSliceAssetName(asset)
      }
      className={className}
      {...props}
    />
  );
};
