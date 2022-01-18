import React from 'react';
import cx from 'classnames';

import { BorrowAsset } from 'types/liquidate';
import { useYToken } from 'providers/YTokenProvider';
import { useCurrency } from 'providers/CurrencyProvider';
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
  loading: boolean
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
  loading,
  className,
}) => {
  const { setBorrowYToken } = useYToken();
  const { convertPriceByBasicCurrency } = useCurrency();

  const handleSetItem = () => {
    setItem(getTokenSlug({ id: asset.id, address: asset.address }));
    setBorrowYToken(asset.yToken);
  };

  return (
    <TableCard
      theme="secondary"
      preloaderTheme="secondary"
      onClick={handleSetItem}
      collapsed={false}
      loading={loading}
      className={cx(s.repayRoot, { [s.active]: active }, className)}
    >
      <div className={s.wrapper}>
        <Radio
          active={active}
          theme="secondary"
          disabled={loading}
          className={s.radio}
        />
        <div className={s.row}>
          <div className={s.title}>
            Borrowed asset
          </div>
          <TokenName
            token={asset}
            active={active}
            loading={loading}
            theme="secondary"
            logoClassName={s.logo}
          />
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Price of borrowed asset
          </div>
          <div className={s.amount}>
            {loading
              ? '-'
              : convertPriceByBasicCurrency(price)}
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Amount of debt
          </div>
          <div className={s.value}>
            <div className={s.amount}>
              {loading
                ? '-'
                : getPrettyAmount({
                  value: amountOfBorrowed,
                  currency: getSliceTokenName(asset),
                })}
            </div>
            <div className={s.amountUsd}>
              {loading
                ? '-'
                : convertPriceByBasicCurrency(amountOfBorrowed.times(price))}
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
                ? '-'
                : getPrettyAmount({
                  value: maxLiquidate,
                  currency: getSliceTokenName(asset),
                })}
            </div>
            <div className={s.amountUsd}>
              {loading
                ? '-'
                : convertPriceByBasicCurrency(maxLiquidate.times(price))}
            </div>
          </div>
        </div>
      </div>
    </TableCard>
  );
};
