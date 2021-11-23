import React from 'react';

import { LiquidationPositions as LiquidatationTable } from 'components/tables/components/desktop';
import { LIQUIDATION_POSITIONS_DATA } from 'components/temp-data/tables/liquidation-positions';

type LiquidationPositionsProps = {
  className?: string
};

export const LiquidationPositions: React.FC<LiquidationPositionsProps> = ({
  className,
}) => (
  <LiquidatationTable
    data={LIQUIDATION_POSITIONS_DATA}
    className={className}
  />
);
