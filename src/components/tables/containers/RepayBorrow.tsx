import React from "react";

import { LiquidateDetailsBorrowedAssets } from "types/liquidate-details";
import { useWiderThanLphone } from "utils/helpers";
import { RepayBorrow as RepayBorrowTable } from "components/tables/desktop";
import { RepayBorrow as RepayBorrowCards } from "components/tables/mobile";

type RepayBorrowProps = {
  data?: LiquidateDetailsBorrowedAssets;
  loading?: boolean;
  className?: string;
};

export const RepayBorrow: React.FC<RepayBorrowProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <RepayBorrowTable data={data} loading={loading} className={className} />
    );
  }

  return <RepayBorrowCards data={data} loading={loading} />;
};
