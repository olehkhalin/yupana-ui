import React from 'react';

import { TableCard } from 'components/ui/TableCard';

import s from '../Cards.module.sass';

type YourBorrowAssetsEmptyCardProps = {
  className?: string
};

export const YourBorrowAssetsEmptyCard: React.FC<YourBorrowAssetsEmptyCardProps> = ({
  className,
}) => (
  <TableCard
    theme="secondary"
    collapsed={false}
    className={className}
  >
    <div className={s.root}>
      <div className={s.column}>
        <div className={s.item}>
          Asset
        </div>
        <div className={s.item}>
          Borrow APY
        </div>
        <div className={s.item}>
          Balance
        </div>
        <div className={s.item}>
          Borrow limit
        </div>
      </div>
      <div className={s.text}>
        You have no borrowed assets
      </div>
    </div>
  </TableCard>
);
