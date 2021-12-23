import React from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { getTokenSlug, getSliceTokenName } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { TableCard } from 'components/ui/TableCard';
import { Radio } from 'components/ui/Radio';
import { TokenName } from 'components/common/TokenName';

import s from './Cards.module.sass';

type RepayBorrowCardProps = {
  id?: string
  address: string
  name?: string
  symbol?: string
  thumbnailUri?: string
  priceOfBorrowedAsset: number
  amountOfDebt: number
  amountOfDebtUsd: number
  maxLiquidate: number
  maxLiquidateUsd: number
  active?: boolean
  setItem: (arg: string) => void
  className?: string
};

export const RepayBorrowCard: React.FC<RepayBorrowCardProps> = ({
  id,
  address,
  name,
  symbol,
  thumbnailUri,
  priceOfBorrowedAsset,
  amountOfDebt,
  amountOfDebtUsd,
  maxLiquidate,
  maxLiquidateUsd,
  active = false,
  setItem,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

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
            token={tokenMetadata}
            active={active}
            logoClassName={s.logo}
          />
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Price of borrowed asset
          </div>
          <div className={s.amount}>
            {convertPriceByBasicCurrency(priceOfBorrowedAsset)}
          </div>
        </div>

        <div className={s.row}>
          <div className={s.title}>
            Amount of debt
          </div>
          <div className={s.value}>
            <div className={s.amount}>
              {getPrettyAmount({
                value: amountOfDebt,
                currency: getSliceTokenName(tokenMetadata),
              })}
            </div>
            <div className={s.amountUsd}>
              {convertPriceByBasicCurrency(amountOfDebtUsd)}
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
                currency: getSliceTokenName(tokenMetadata),
              })}
            </div>
            <div className={s.amountUsd}>
              {convertPriceByBasicCurrency(maxLiquidateUsd)}
            </div>
          </div>
        </div>
      </div>
    </TableCard>
  );
};
