import React, { FC } from "react";

import { AssetsResponseData } from "types/asset";
import { useWiderThanLphone } from "utils/helpers";
import { SupplyAssets as SupplyAssetsTable } from "components/tables/desktop";
import { SupplyAssets as SupplyAssetsCards } from "components/tables/mobile";

type SupplyAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const SupplyAssets: FC<SupplyAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <SupplyAssetsTable
        tableName="Supply assets"
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return (
    <SupplyAssetsCards
      tableName="Supply assets"
      data={data}
      loading={loading}
    />
  );
};
