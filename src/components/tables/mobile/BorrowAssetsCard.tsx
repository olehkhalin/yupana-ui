import React from 'react';

import { getSlice } from 'utils/getSlice';
import { getTokenName } from 'utils/getTokenName';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type BorrowAssetsCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  liquidity: number
  borrowApy: number
  utilisationRate: number
  thumbnailUri?: string
  className?: string
};

export const BorrowAssetsCard: React.FC<BorrowAssetsCardProps> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  liquidity,
  borrowApy,
  utilisationRate,
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
          Utilisation rate
        </div>
        <div className={s.value}>
          {`${utilisationRate.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Liquidity
        </div>
        <div className={s.value}>
          {`${liquidity} ${getSlice(getTokenName(tokenMetadata), 5)}`}
        </div>
      </div>
    </TableCard>
  );
};
