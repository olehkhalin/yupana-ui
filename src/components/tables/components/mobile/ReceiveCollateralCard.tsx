import React from 'react';
import cx from 'classnames';

import { useYToken } from 'providers/YTokenProvider';
import { useCurrency } from 'providers/CurrencyProvider';
import { getTokenSlug, getSliceTokenName } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { TableCard } from 'components/ui/TableCard';
import { Radio } from 'components/ui/Radio';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type ReceiveCollateralCardProps = {
  data: any
  active?: boolean
  setItem: (arg: string) => void
  loading: boolean
  className?: string
};

export const ReceiveCollateralCard: React.FC<ReceiveCollateralCardProps> = ({
  data: {
    asset,
    amountOfSupplied,
    amountOfSuppliedInUsd,
    maxBonus,
    price,
  },
  active = false,
  setItem,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();
  const { borrowYToken, setCollateralYToken } = useYToken();
  const isBorrowTokenSelect = borrowYToken?.toString();

  const handleSetItem = () => {
    setItem(getTokenSlug({ id: asset.id, address: asset.address }));
    setCollateralYToken(asset.yToken);
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
            token={asset}
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
              ? price
              : getPrettyAmount({ value: price, currency: '$' })}
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
                  currency: getSliceTokenName(asset),
                })}
            </div>
            <div className={s.amountUsd}>
              {loading
                ? amountOfSuppliedInUsd
                : convertPriceByBasicCurrency(amountOfSuppliedInUsd)}
            </div>
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            MAX Bonus
          </div>
          <div className={s.value}>
            <div className={s.amount}>
              {(loading || !isBorrowTokenSelect)
                ? '—'
                : getPrettyAmount({
                  value: maxBonus,
                  currency: getSliceTokenName(asset),
                })}
            </div>
            <div className={s.amountUsd}>
              {(loading || !isBorrowTokenSelect)
                ? '—'
                : convertPriceByBasicCurrency(maxBonus)}
            </div>
          </div>
        </div>
      </div>
    </TableCard>
  );
};
