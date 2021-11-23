import React from 'react';

import { TableCard } from 'components/ui/TableCard';

import s from '../Cards.module.sass';

type YourSupplyAssetsEmptyCardProps = {
  className?: string
};

export const YourSupplyAssetsEmptyCard: React.FC<YourSupplyAssetsEmptyCardProps> = ({
  className,
}) => (
  <TableCard
    collapsed={false}
    className={className}
  >
    <div className={s.root}>
      <div className={s.column}>
        <div className={s.item}>
          Asset
        </div>
        <div className={s.item}>
          Supply APY
        </div>
        <div className={s.item}>
          Balance
        </div>
        <div className={s.item}>
          Collateral
        </div>
      </div>
      <div className={s.text}>
        You have no supplied assets
      </div>
    </div>
  </TableCard>
);
