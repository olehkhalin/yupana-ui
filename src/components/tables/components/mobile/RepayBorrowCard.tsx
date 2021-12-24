import React from 'react';
import cx from 'classnames';

import { BorrowAsset } from 'types/liquidate';
import { getTokenSlug, getSliceTokenName } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { TableCard } from 'components/ui/TableCard';
import { Radio } from 'components/ui/Radio';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type RepayBorrowCardProps = {
  data: BorrowAsset
  active?: boolean
  setItem: (arg: string) => void
  className?: string
};

export const RepayBorrowCard: React.FC<RepayBorrowCardProps> = ({
  data: {
    asset,
    amountOfBorrowed,
    maxLiquidate,
    price,
  },
  active = false,
  setItem,
  className,
}) => {
  const handleSetItem = () => {
    setItem(getTokenSlug({ id: asset.id, address: asset.address }));
  };

  return (
    <TableCard
      theme="secondary"
      onClick={handleSetItem}
      collapsed={false}
      className={cx(s.repayRoot, { [s.active]: active }, className)}
    >
      <div className={s.wrapper}>
        <Radio
          active={active}
          theme="secondary"
          className={s.radio}
        />
        <div className={s.row}>
          <div className={s.title}>
            Borrowed asset
          </div>
          <TokenName
            token={asset}
            active={active}
            logoClassName={s.logo}
          />
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Price of borrowed asset
          </div>
          <div className={s.amount}>
            {getPrettyAmount({ value: price, currency: '$' })}
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Amount of debt
          </div>
          <div className={s.value}>
            <div className={s.amount}>
              {getPrettyAmount({
                value: amountOfBorrowed,
                currency: getSliceTokenName(asset),
              })}
            </div>
            <div className={s.amountUsd}>
              {getPrettyAmount({
                value: 100,
                currency: '$',
              })}
            </div>
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            MAX Liquidate
          </div>
          <div className={s.value}>
            <div className={s.amount}>
              {getPrettyAmount({
                value: maxLiquidate,
                currency: getSliceTokenName(asset),
              })}
            </div>
            <div className={s.amountUsd}>
              {getPrettyAmount({
                value: 100,
                currency: '$',
              })}
            </div>
          </div>
        </div>
      </div>
    </TableCard>
  );
};
