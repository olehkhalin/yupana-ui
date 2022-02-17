import React from "react";

import { AssetsResponseData } from "types/asset";
import { useWiderThanLphone } from "utils/helpers";
import { Markets as MarketsTable } from "components/tables/desktop";
import { Markets as MarketsCards } from "components/tables/mobile";

type MarketsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const Markets: React.FC<MarketsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return <MarketsTable data={data} loading={loading} className={className} />;
  }

  return <MarketsCards data={data} loading={loading} />;
};
