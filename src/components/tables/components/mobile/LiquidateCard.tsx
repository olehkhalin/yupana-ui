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
  totalBorrowed: number
  borrowedAssetsName: string[]
  collateralAssetsName: string[]
  healthFactor: number
  borrowerAddress: string
  loading: boolean
  className?: string
};

export const LiquidateCard: React.FC<LiquidateCardProps> = ({
  borrowedAssetsName,
  collateralAssetsName,
  borrowerAddress,
  healthFactor,
  totalBorrowed,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

  return (
    <TableCard
      theme="secondary"
      collapsed={false}
      className={cx(s.liquidate, className)}
    >
      <div className={s.row}>
        <div className={s.title}>
          Asset
        </div>
        <div className={s.value}>
          {loading ? '-' : convertPriceByBasicCurrency(totalBorrowed)}
        </div>
      </div>
      <div className={s.row}>
        <div className={s.title}>
          Borrow APY
        </div>
        <div className={s.value}>
          {loading
            ? '-'
            : borrowedAssetsName.join(', ')}
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
            ? '-'
            : getPrettyAmount({ value: healthFactor })}
        </div>
      </div>

      <div className={cx(s.row, s.blue)}>
        <div className={s.title}>
          Collateral asset
        </div>
        <div className={s.value}>
          {loading ? '-' : collateralAssetsName.join(', ')}
        </div>
      </div>

      <div className={cx(s.row, s.white)}>
        <div className={s.title}>
          Borrowed address
        </div>
        <div className={s.value}>
          {loading
            ? '-'
            : shortize(borrowerAddress)}
        </div>
      </div>
    </TableCard>
  );
};
