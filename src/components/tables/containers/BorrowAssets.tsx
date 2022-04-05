import React, { FC } from "react";

import { AssetsResponseData } from "types/asset";
import { useWiderThanLphone } from "utils/helpers";
import { BorrowAssets as BorrowAssetsTable } from "components/tables/desktop";
import { BorrowAssets as BorrowAssetsCards } from "components/tables/mobile";

type BorrowAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const BorrowAssets: FC<BorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <BorrowAssetsTable
        tableName="borrow"
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return <BorrowAssetsCards tableName="borrow" data={data} loading={loading} />;
};
