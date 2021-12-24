import React from 'react';
import cx from 'classnames';

import { LiquidateData } from 'types/liquidate';
import { shortize } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { TableCard } from 'components/ui/TableCard';
import { Button } from 'components/ui/Button';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './Cards.module.sass';

type LiquidateCardProps = {
  data: LiquidateData
  className?: string
};

export const LiquidateCard: React.FC<LiquidateCardProps> = ({
  data: {
    borrowedAssetsName,
    collateralAssetsName,
    borrowerAddress,
    healthFactor,
    totalBorrowed,
  },
  className,
}) => (
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
        {getPrettyAmount({ value: totalBorrowed, currency: '$' })}
      </div>
    </div>

    <div className={s.row}>
      <div className={s.title}>
        Borrow APY
      </div>
      <div className={s.value}>
        {borrowedAssetsName.join(', ')}
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
        {getPrettyAmount({ value: healthFactor })}
      </div>
    </div>

    <div className={cx(s.row, s.blue)}>
      <div className={s.title}>
        Collateral asset
      </div>
      <div className={s.value}>
        {collateralAssetsName}
      </div>
    </div>

    <div className={cx(s.row, s.white)}>
      <div className={s.title}>
        Borrowed address
      </div>
      <div className={s.value}>
        {shortize(borrowerAddress)}
      </div>
    </div>
  </TableCard>
);
