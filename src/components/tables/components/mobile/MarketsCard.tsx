import React from 'react';
import cx from 'classnames';

import { getTokenSlug } from 'utils/getTokenSlug';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { TokenMetadataInterface } from 'types/token';
import { TableCard } from 'components/ui/TableCard';
import { Preloader } from 'components/ui/Preloader';
import { TokenName } from 'components/common/TokenName';
import { AppRoutes } from 'routes/main-routes';

import s from './Cards.module.sass';

type MarketsCardProps = {
  loading?: number
  yToken: number
  totalSupply: number
  supplyApy: number
  numberOfSupplier: number
  totalBorrow: number
  borrowApy: number
  numberOfBorrowers: number
  details?: boolean
  className?: string
} & TokenMetadataInterface;

export const MarketsCard: React.FC<MarketsCardProps> = ({
  loading,
  yToken,
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
    yToken,
  };

  return (
    <TableCard
      withDetailsButton={!details}
      collapsed={false}
      href={`${AppRoutes.MARKETS}/${getTokenSlug({ id, address })}&${yToken}`}
      className={cx({ [s.marketsDetails]: details }, className)}
    >
      {!details && (
      <div className={s.row}>
        <div className={cx(s.title, s.white)}>
          Market
        </div>
        <TokenName
          token={tokenMetadata}
          logoClassName={s.logo}
        />
      </div>
      )}

      <div className={s.row}>
        <div className={s.title}>
          Total Supply
        </div>
        <div className={s.value}>
          {loading
            ? getPrettyAmount({ value: totalSupply, currency: '$' })
            : <Preloader />}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Supply APY
        </div>
        <div className={s.value}>
          {loading
            ? getPrettyPercent(supplyApy)
            : <Preloader />}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          # of supplier
        </div>
        <div className={s.value}>
          {loading
            ? numberOfSupplier
            : <Preloader />}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          Total borrow
        </div>
        <div className={s.value}>
          {loading
            ? getPrettyAmount({ value: totalBorrow, currency: '$' })
            : <Preloader />}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          Borrow APY
        </div>
        <div className={s.value}>
          {loading
            ? getPrettyPercent(borrowApy)
            : <Preloader />}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          # of borrowers
        </div>
        <div className={s.value}>
          {!loading
            ? `${numberOfBorrowers.toFixed(2)}%`
            : <Preloader />}
        </div>
      </div>
    </TableCard>
  );
};
