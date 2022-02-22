import React from "react";

import { AssetsResponseData } from "types/asset";
import { useWiderThanLphone } from "utils/helpers";
import { BorrowAssets as BorrowAssetsTable } from "components/tables/desktop";
import { BorrowAssets as BorrowAssetsCards } from "components/tables/mobile";

type BorrowAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <BorrowAssetsTable data={data} loading={loading} className={className} />
    );
  }

  return <BorrowAssetsCards data={data} loading={loading} />;
};
