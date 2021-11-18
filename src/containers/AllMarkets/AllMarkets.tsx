import React from 'react';

import { Markets } from 'components/tables/containers/Markets';
import { ALL_MARKETS_DATA } from 'components/temp-data/tables/markets';

type AllMarketsProps = {
  className?: string
};

export const AllMarkets: React.FC<AllMarketsProps> = ({
  className,
}) => (
  <Markets
    data={ALL_MARKETS_DATA}
    className={className}
  />
);
