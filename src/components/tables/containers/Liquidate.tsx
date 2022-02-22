import React, { FC } from "react";
import BigNumber from "bignumber.js";

import { useWiderThanLphone } from "utils/helpers";
import { Liquidate as LiquidateTable } from "components/tables/desktop";
import { Liquidate as LiquidateCards } from "components/tables/mobile";

export type LiquidateData = {
  borrowerAddress: string;
  borrowedAssetsNames: string[];
  collateralAssetsNames: string[];
  totalBorrowed: BigNumber;
  healthFactor: BigNumber;
}[];

type LiquidateProps = {
  data?: LiquidateData;
  loading?: boolean;
  className?: string;
};

export const Liquidate: FC<LiquidateProps> = ({ data, loading, className }) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <LiquidateTable data={data} loading={loading} className={className} />
    );
  }

  return <LiquidateCards data={data} loading={loading} />;
};
