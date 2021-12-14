import React from 'react';
import cx from 'classnames';

import { getTokenSlug } from 'utils/getTokenSlug';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { TableCard } from 'components/ui/TableCard';
import { Radio } from 'components/ui/Radio';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type ReceiveCollateralCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  thumbnailUri?: string
  priceOfReceiveAsset: number
  amountOfSupplied: number
  amountOfSuppliedUsd: number
  maxBonus: number
  maxBonusUsd: number
  loading: boolean
  active?: boolean
  setItem: (arg: string) => void
  className?: string
};

export const ReceiveCollateralCard: React.FC<ReceiveCollateralCardProps> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  priceOfReceiveAsset,
  amountOfSupplied,
  amountOfSuppliedUsd,
  maxBonus,
  maxBonusUsd,
  loading,
  active = false,
  setItem,
  className,
}) => {
  const handleSetItem = () => {
    setItem(getTokenSlug({ id, address }));
  };

  const tokenMetadata = {
    id,
    address,
    name,
    symbol,
    thumbnailUri,
  };

  return (
    <TableCard
      preloaderTheme="primary"
      onClick={handleSetItem}
      collapsed={false}
      loading={loading}
      className={cx(s.receiveRoot, { [s.active]: active }, className)}
    >
      <div className={s.wrapper}>
        <Radio
          active={active}
          disabled={loading}
          className={s.radio}
        />
        <div className={s.row}>
          <div className={s.title}>
            Receive asset
          </div>
          <TokenName
            token={tokenMetadata}
            active={active}
            loading={loading}
            theme="primary"
            logoClassName={s.logo}
          />
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Price of borrowed asset
          </div>
          <div className={s.amount}>
            {loading
              ? priceOfReceiveAsset
              : getPrettyAmount({ value: priceOfReceiveAsset, currency: '$' })}
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Amount of debt
          </div>
          <div className={s.value}>
            <div className={s.amount}>
              {loading
                ? amountOfSupplied
                : getPrettyAmount({
                  value: amountOfSupplied,
                  currency: getSliceTokenName(tokenMetadata),
                })}
            </div>
            <div className={s.amountUsd}>
              {loading
                ? amountOfSuppliedUsd
                : getPrettyAmount({
                  value: amountOfSuppliedUsd,
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
              {loading
                ? maxBonus
                : getPrettyAmount({
                  value: maxBonus,
                  currency: getSliceTokenName(tokenMetadata),
                })}
            </div>
            <div className={s.amountUsd}>
              {loading
                ? maxBonusUsd
                : getPrettyAmount({
                  value: maxBonusUsd,
                  currency: '$',
                })}
            </div>
          </div>
        </div>
      </div>
    </TableCard>
  );
};
