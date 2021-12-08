import React from 'react';

import { Liquidate as LiquidateTable } from 'components/tables/containers/Liquidate';
import { LIQUIDATE_DATA } from 'components/temp-data/tables/liquidate';

type LiquidateProps = {
  className?: string
};

export const Liquidate: React.FC<LiquidateProps> = ({
  className,
}) => (
  <LiquidateTable
    data={LIQUIDATE_DATA}
    className={className}
  />
);
