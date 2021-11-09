import React from 'react';
import cx from 'classnames';

import { getPrettyPrice } from 'utils/getPrettyPrice';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type MarketsCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  thumbnailUri?: string
  totalSupply: number
  supplyApy: number
  numberOfSupplier: number
  totalBorrow: number
  borrowApy: number
  numberOfBorrowers: number
  className?: string
};

export const MarketsCard: React.FC<MarketsCardProps> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  totalSupply,
  numberOfSupplier,
  totalBorrow,
  borrowApy,
  supplyApy,
  numberOfBorrowers,
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
      market
      className={className}
    >
      <div className={s.row}>
        <div className={cx(s.title, s.white)}>
          Market
        </div>
        <TokenName
          token={tokenMetadata}
          logoClassName={s.logo}
        />
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Total Supply
        </div>
        <div className={s.value}>
          {`$ ${getPrettyPrice(totalSupply)}`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Supply APY
        </div>
        <div className={s.value}>
          {`${supplyApy.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          # of supplier
        </div>
        <div className={s.value}>
          {numberOfSupplier}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow)}>
          Total borrow
        </div>
        <div className={s.value}>
          {`$ ${getPrettyPrice(totalBorrow)}`}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow)}>
          Borrow APY
        </div>
        <div className={s.value}>
          {`${borrowApy.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow)}>
          # of borrowers
        </div>
        <div className={s.value}>
          {`${numberOfBorrowers.toFixed(2)}%`}
        </div>
      </div>
    </TableCard>
  );
};
