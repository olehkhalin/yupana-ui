import React from 'react';
import cx from 'classnames';

import { SupplyAsset } from 'types/liquidate';
import { getTokenSlug, getSliceTokenName } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { TableCard } from 'components/ui/TableCard';
import { Radio } from 'components/ui/Radio';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type ReceiveCollateralCardProps = {
  data: SupplyAsset
  active?: boolean
  setItem: (arg: string) => void
  className?: string
};

export const ReceiveCollateralCard: React.FC<ReceiveCollateralCardProps> = ({
  data: {
    asset,
    amountOfSupplied,
    maxBonus,
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
      onClick={handleSetItem}
      collapsed={false}
      className={cx(s.receiveRoot, { [s.active]: active }, className)}
    >
      <div className={s.wrapper}>
        <Radio
          active={active}
          className={s.radio}
        />
        <div className={s.row}>
          <div className={s.title}>
            Receive asset
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
                value: amountOfSupplied,
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
                value: maxBonus,
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
