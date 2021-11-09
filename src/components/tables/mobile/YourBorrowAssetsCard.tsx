import React from 'react';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
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
          {getPrettyAmount({ value: balance, currency: getSliceTokenName(tokenMetadata) })}
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
