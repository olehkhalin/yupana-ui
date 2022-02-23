import React, { FC } from "react";

import { AssetsResponseData } from "types/asset";
import { useWiderThanLphone } from "utils/helpers";
import { YourBorrowAssets as YourBorrowAssetsTable } from "components/tables/desktop";
import { YourBorrowAssets as YourBorrowAssetsCards } from "components/tables/mobile";

type YourBorrowAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const YourBorrowAssets: FC<YourBorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <YourBorrowAssetsTable
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return <YourBorrowAssetsCards data={data} loading={loading} />;
};
