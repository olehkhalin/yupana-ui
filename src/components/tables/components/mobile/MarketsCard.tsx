import React from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { getPrettyPercent } from 'utils/helpers/amount';
import { TokenMetadataInterface } from 'types/token';
import { TableCard } from 'components/ui/TableCard';
import { TokenName } from 'components/common/TokenName';
import { AppRoutes } from 'routes/main-routes';

import s from './Cards.module.sass';

type MarketsCardProps = {
  yToken: number
  totalSupply: number
  supplyApy: number
  numberOfSupplier: number
  totalBorrow: number
  borrowApy: number
  numberOfBorrowers: number
  details?: boolean
  loading: boolean
  className?: string
} & TokenMetadataInterface;

export const MarketsCard: React.FC<MarketsCardProps> = ({
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
  loading,
  details = false,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

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
      href={`${AppRoutes.MARKETS}/${yToken}`}
      preloaderTheme="tertiary"
      loading={loading}
      className={cx({ [s.marketsDetails]: details }, className)}
    >
      {!details && (
      <div className={s.row}>
        <div className={cx(s.title, s.white)}>
          Market
        </div>
        <TokenName
          token={tokenMetadata}
          loading={loading}
          theme="tertiary"
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
            ? totalSupply
            : convertPriceByBasicCurrency(totalSupply)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Supply APY
        </div>
        <div className={s.value}>
          {loading
            ? supplyApy
            : getPrettyPercent(supplyApy)}
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
          {loading
            ? totalBorrow
            : convertPriceByBasicCurrency(totalBorrow)}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          Borrow APY
        </div>
        <div className={s.value}>
          {loading
            ? borrowApy
            : getPrettyPercent(borrowApy)}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.yellow, s.yellowShadow)}>
          # of borrowers
        </div>
        <div className={s.value}>
          {loading
            ? numberOfBorrowers
            : getPrettyPercent(numberOfBorrowers)}
        </div>
      </div>
    </TableCard>
  );
};
