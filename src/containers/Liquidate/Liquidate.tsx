import React from 'react';

import { Liquidate as LiquidateTable } from 'components/tables/containers/Liquidate';
import { LIQUIDATE_DATA } from 'components/temp-data/tables/liquidate';
import { LOQUIDATE_LOADINT_DATA } from 'components/tables/loading-preview/liquidate-loading';
import { useLoading } from 'hooks/useLoading';

type LiquidateProps = {
  className?: string
};

export const Liquidate: React.FC<LiquidateProps> = ({
  className,
}) => {
  // TODO: Delete later
  const { loading } = useLoading();

  return (
    <LiquidateTable
      data={loading ? LOQUIDATE_LOADINT_DATA : LIQUIDATE_DATA}
      loading={loading}
      className={className}
    />
  );
};
