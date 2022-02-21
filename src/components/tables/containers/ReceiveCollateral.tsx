import React from "react";

import { LiquidateDetailsCollateralAssets } from "types/liquidate-details";
import { useWiderThanLphone } from "utils/helpers";
import { ReceiveCollateral as ReceiveCollateralTable } from "components/tables/desktop";
import { ReceiveCollateral as ReceiveCollateralCards } from "components/tables/mobile";

type ReceiveCollateralProps = {
  data?: LiquidateDetailsCollateralAssets;
  loading?: boolean;
  className?: string;
};

export const ReceiveCollateral: React.FC<ReceiveCollateralProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <ReceiveCollateralTable
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return <ReceiveCollateralCards data={data} loading={loading} />;
};
