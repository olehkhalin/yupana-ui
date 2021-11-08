import React from 'react';

import { getSlice } from 'utils/getSlice';
import { getTokenName } from 'utils/getTokenName';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type YourBorrowAssetsCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  borrowLimit: number
  borrowApy: number
  balance: number
  thumbnailUri?: string
  className?: string
};

export const YourBorrowAssetsCard: React.FC<YourBorrowAssetsCardProps> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  borrowLimit,
  borrowApy,
  balance,
  className,
}) => {
  const tokenMetadata = {
    id,
    address,
    name,
    symbol,
    thumbnailUri,
  };

  return (
    <TableCard
      theme="secondary"
      className={className}
    >
      <div className={s.row}>
        <div className={s.title}>
          Asset
        </div>
        <TokenName
          token={tokenMetadata}
          logoClassName={s.logo}
        />
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Borrow APY
        </div>
        <div className={s.value}>
          {`${borrowApy.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Balance
        </div>
        <div className={s.value}>
          {`${balance} ${getSlice(getTokenName(tokenMetadata), 5)}`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Borrow limit
        </div>
        <div className={s.value}>
          {`${borrowLimit.toFixed(2)}%`}
        </div>
      </div>
    </TableCard>
  );
};
