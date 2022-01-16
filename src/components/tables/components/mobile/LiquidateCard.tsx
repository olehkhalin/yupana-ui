import React from 'react';
import cx from 'classnames';

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
}) => (
  <TableCard
    theme="secondary"
    preloaderTheme="tertiary"
    loading={loading}
    collapsed={false}
    className={cx(s.liquidate, className)}
  >
    <div className={s.row}>
      <div className={s.title}>
        Asset
      </div>
      <div className={s.value}>
        {loading
          ? totalBorrow
          : getPrettyAmount({ value: totalBorrow, currency: '$' })}
      </div>
    </div>

    <div className={s.row}>
      <div className={s.title}>
        Borrow APY
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
