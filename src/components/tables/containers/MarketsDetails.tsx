import React from "react";
import BigNumber from "bignumber.js";

import { useWiderThanLphone } from "utils/helpers";
import { MarketsDetails as MarketsDetailsTable } from "components/tables/desktop";
import { MarketsDetails as MarketsDetailsCards } from "components/tables/mobile";

export type MarketsDetailsInfo = {
  totalSupply: BigNumber;
  supplyApy: BigNumber;
  numberOfSupplier: number;
  totalBorrow: BigNumber;
  borrowApy: BigNumber;
  numberOfBorrowers: number;
};

type MarketsDetailsProps = {
  data?: MarketsDetailsInfo[];
  loading?: boolean;
  className?: string;
};

export const MarketsDetails: React.FC<MarketsDetailsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <MarketsDetailsTable
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return <MarketsDetailsCards data={data} loading={loading} />;
};
