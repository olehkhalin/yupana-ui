import React, { useMemo, useState, useEffect } from 'react';
import { Row } from 'react-table';

import { useYToken } from 'providers/YTokenProvider';
import { useCurrency } from 'providers/CurrencyProvider';
import { YToken } from 'types/liquidate';
import { TokenMetadataInterface } from 'types/token';
import { getTokenSlug, getSliceTokenName } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { Radio } from 'components/ui/Radio';
import { Table } from 'components/ui/Table';
import { TokenName } from 'components/common/TokenName';

import s from './Tables.module.sass';

type ReceiveCollateralProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const ReceiveCollateral: React.FC<ReceiveCollateralProps> = ({
  data,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();
  const { borrowYToken, setCollateralYToken } = useYToken();
  const [selectedItem, setSelectedItem] = useState<
  TokenMetadataInterface & YToken | undefined
  >(undefined);

  const isBorrowTokenSelect = borrowYToken?.toString();

  useEffect(() => {
    if (selectedItem) {
      setCollateralYToken(selectedItem.yToken);
    }
  }, [selectedItem, setCollateralYToken]);

  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={s.blue}>
            Receive asset
          </span>
        ),
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => {
          const isRadioButtonActive = selectedItem && !loading
            ? getTokenSlug(row.values.asset) === getTokenSlug({
              address: selectedItem.address,
              id: selectedItem.id,
            })
            : false;
          return (
            <>
              <Radio
                active={isRadioButtonActive}
                disabled={loading}
                className={s.radio}
              />
              <TokenName
                token={{ ...row.values.asset }}
                theme="primary"
                loading={loading}
              />
            </>
          );
        },
      },
      {
        Header: () => (
          <span className={s.blue}>
            Price of receive asset
          </span>
        ),
        id: 'priceOfReceiveAsset',
        accessor: ({ price }: any) => (
          loading
            ? '—'
            : convertPriceByBasicCurrency(price)
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Amount of supplied
          </span>
        ),
        id: 'amountOfSupplied',
        accessor: ({ amountOfSupplied, price, asset }: any) => (
          <div>
            <div className={s.amount}>
              {
                loading
                  ? '—'
                  : getPrettyAmount({
                    value: amountOfSupplied,
                    currency: getSliceTokenName(asset),
                  })
              }
            </div>
            <div className={s.amountUsd}>
              {
                loading
                  ? '—'
                  : convertPriceByBasicCurrency(amountOfSupplied.times(price))
              }
            </div>
          </div>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            MAX Bonus
          </span>
        ),
        id: 'maxBonus',
        accessor: ({ maxBonus, price, asset }: any) => (
          <div>
            <div className={s.amount}>
              {
                (loading || !isBorrowTokenSelect)
                  ? '—'
                  : getPrettyAmount({
                    value: maxBonus,
                    currency: getSliceTokenName(asset),
                  })
              }
            </div>
            <div className={s.amountUsd}>
              {
                (loading || !isBorrowTokenSelect)
                  ? '—'
                  : convertPriceByBasicCurrency(maxBonus.times(price))
              }
            </div>
          </div>
        ),
      },
    ],
    [selectedItem, loading, convertPriceByBasicCurrency, isBorrowTokenSelect],
  );

  return (
    <Table
      theme="quinary"
      preloaderTheme="primary"
      columns={columns}
      data={data}
      loading={loading}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem}
      rowClassName={s.repayRow}
      theadClassName={s.repayThead}
      className={className}
    />
  );
};
