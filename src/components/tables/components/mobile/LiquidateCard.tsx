import React from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { shortize } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { TableCard } from 'components/ui/TableCard';
import { Button } from 'components/ui/Button';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './Cards.module.sass';

type LiquidateCardProps = {
  totalBorrow: number
  borrowedAsset: string[]
  collateralAsset: string
  healthFactor: number
  borrowerAddress: string
  loading: boolean
  className?: string
};

export const LiquidateCard: React.FC<LiquidateCardProps> = ({
  totalBorrow,
  borrowedAsset,
  collateralAsset,
  healthFactor,
  borrowerAddress,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

  return (
    <TableCard
      theme="secondary"
      collapsed={false}
      loading={loading}
      className={cx(s.liquidate, className)}
    >
      <div className={s.row}>
        <div className={s.title}>
          Total borrow
        </div>
        <div className={s.value}>
          {loading ? totalBorrow : convertPriceByBasicCurrency(totalBorrow)}
        </div>
      </div>

      <div className={s.row}>
        <div className={s.title}>
          Borrowed asset
        </div>
        <div className={s.value}>
          {loading
            ? borrowedAsset
            : borrowedAsset.join(', ')}
        </div>
      </div>

      <div className={s.row}>
        <div className={cx(s.title, s.healthFactor)}>
          Health Factor
          <Button
            theme="clear"
            className={s.attention}
          >
            <Attention className={s.attentionIcon} />
          </Button>
        </div>
        <div className={s.value}>
          {loading
            ? healthFactor
            : getPrettyAmount({ value: healthFactor })}
        </div>
      </div>

      <div className={cx(s.row, s.blue)}>
        <div className={s.title}>
          Collateral asset
        </div>
        <div className={s.value}>
          {collateralAsset}
        </div>
      </div>

      <div className={cx(s.row, s.white)}>
        <div className={s.title}>
          Borrowed address
        </div>
        <div className={s.value}>
          {loading
            ? borrowerAddress
            : shortize(borrowerAddress)}
        </div>
      </div>
    </TableCard>
  );
};
