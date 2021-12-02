import React from 'react';
import cx from 'classnames';

import { getTokenSlug } from 'utils/getTokenSlug';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';
import { AppRoutes } from 'routes/main-routes';

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
  details?: boolean
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
  details = false,
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
      withDetailsButton={!details}
      collapsed={false}
      href={`${AppRoutes.MARKETS}/${getTokenSlug({ address, id })}`}
      className={cx({ [s.marketsDetails]: details }, className)}
    >
      {!details && (
      <div className={s.row}>
        <div className={cx(s.title, s.white)}>
          Market
        </div>
        <TokenName
          token={tokenMetadata}
          href={`${AppRoutes.MARKETS}/${getTokenSlug(tokenMetadata)}`}
          logoClassName={s.logo}
        />
      </div>
      )}

      <div className={s.row}>
        <div className={s.title}>
          Total Supply
        </div>
        <div className={s.value}>
          {getPrettyAmount({ value: totalSupply, currency: '$' })}
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
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          Total borrow
        </div>
        <div className={s.value}>
          {getPrettyAmount({ value: totalBorrow, currency: '$' })}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          Borrow APY
        </div>
        <div className={s.value}>
          {`${borrowApy.toFixed(2)}%`}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          # of borrowers
        </div>
        <div className={s.value}>
          {`${numberOfBorrowers.toFixed(2)}%`}
        </div>
      </div>
    </TableCard>
  );
};
