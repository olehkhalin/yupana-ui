import React, { FC } from "react";

import { AssetsResponseData } from "types/asset";
import { useWiderThanLphone } from "utils/helpers";
import { YourSupplyAssets as YourSupplyAssetsTable } from "components/tables/desktop";
import { YourSupplyAssets as YourSupplyAssetsCards } from "components/tables/mobile";

type YourSupplyAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const YourSupplyAssets: FC<YourSupplyAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <YourSupplyAssetsTable
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return <YourSupplyAssetsCards data={data} loading={loading} />;
};
