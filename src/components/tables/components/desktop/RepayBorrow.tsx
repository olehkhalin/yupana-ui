import React, { useMemo, useState } from 'react';
import { Row } from 'react-table';

import { useCurrency } from 'providers/CurrencyProvider';
import { TokenMetadataInterface } from 'types/token';
import { getTokenSlug, getSliceTokenName } from 'utils/helpers/token';
import { getPrettyAmount } from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';
import { Radio } from 'components/ui/Radio';
import { TokenName } from 'components/common/TokenName';

import s from './Tables.module.sass';

type RepayBorrowProps = {
  data: any[]
  className?: string
};

export const RepayBorrow: React.FC<RepayBorrowProps> = ({
  data,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();
  const [selectedItem, setSelectedItem] = useState<TokenMetadataInterface | undefined>(undefined);

  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
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
                theme="secondary"
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
          <span className={s.yellow}>
            Price of borrowed asset
          </span>
        ),
        id: 'priceOfBorrowedAsset',
        accessor: ({ priceOfBorrowedAsset }: { priceOfBorrowedAsset: number }) => (
          convertPriceByBasicCurrency(priceOfBorrowedAsset)
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Amount of debt
          </span>
        ),
        id: 'amountOfDebt',
        accessor: ({ amountOfDebt, amountOfDebtUsd, asset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: amountOfDebt,
                currency: getSliceTokenName(asset),
              })}
            </div>
            <div className={s.amountUsd}>
              {convertPriceByBasicCurrency(amountOfDebtUsd)}
            </div>
          </div>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            MAX Liquidate
          </span>
        ),
        id: 'maxLiquidate',
        accessor: ({ maxLiquidate, maxLiquidateUsd, asset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: maxLiquidate,
                currency: getSliceTokenName(asset),
              })}
            </div>
            <div className={s.amountUsd}>
              {convertPriceByBasicCurrency(maxLiquidateUsd)}
            </div>
          </div>
        ),
      },
    ],
    [convertPriceByBasicCurrency, selectedItem],
  );

  return (
    <Table
      theme="octonary"
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
