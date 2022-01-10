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
  className?: string
};

export const ReceiveCollateral: React.FC<ReceiveCollateralProps> = ({
  data,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();
  const { borrowYToken, setCollateralYToken } = useYToken();
  const [selectedItem, setSelectedItem] = useState<
  TokenMetadataInterface & YToken | undefined
  >(undefined);

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
          const isRadioButtonActive = selectedItem
            ? getTokenSlug(row.values.asset) === getTokenSlug({
              address: selectedItem.address,
              id: selectedItem.id,
            })
            : false;
          return (
            <>
              <Radio
                active={isRadioButtonActive}
                className={s.radio}
              />
              <TokenName
                token={{ ...row.values.asset }}
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
          convertPriceByBasicCurrency(price)
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
              {getPrettyAmount({
                value: amountOfSupplied,
                currency: getSliceTokenName(asset),
              })}
            </div>
            <div className={s.amountUsd}>
              {convertPriceByBasicCurrency(amountOfSupplied.times(price))}
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
        accessor: ({ maxBonus, price, asset }: any) => {
          if (borrowYToken?.toString()) {
            return (
              <div>
                <div className={s.amount}>
                  {getPrettyAmount({
                    value: maxBonus,
                    currency: getSliceTokenName(asset),
                  })}
                </div>
                <div className={s.amountUsd}>
                  {convertPriceByBasicCurrency(maxBonus.times(price))}
                </div>
              </div>
            );
          }
          return '—';
        },
      },
    ],
    [borrowYToken, convertPriceByBasicCurrency, selectedItem],
  );

  return (
    <Table
      theme="quinary"
      columns={columns}
      data={data}
      setSelectedItem={setSelectedItem}
      selectedItem={selectedItem}
      rowClassName={s.repayRow}
      theadClassName={s.repayThead}
      className={className}
    />
  );
};
