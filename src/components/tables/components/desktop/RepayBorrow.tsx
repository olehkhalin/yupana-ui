import React, { useMemo, useState } from 'react';
import { Row } from 'react-table';

import { TokenMetadataInterface } from 'types/token';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
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
  const [selectedItem, setSelectedItem] = useState<TokenMetadataInterface | undefined>(undefined);

  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => (

        accessor: (row: any) => (
          <>
            <Radio
              theme="secondary"
              className={s.radio}
            />
            <TokenName
              token={{ ...row.values.asset }}
            />
          </>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Price of borrowed asset
          </span>
        ),
        id: 'priceOfBorrowedAsset',
        accessor: ({ priceOfBorrowedAsset }: { priceOfBorrowedAsset: number }) => `${priceOfBorrowedAsset.toFixed(2)}%`,
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
              {getPrettyAmount({
                value: amountOfDebtUsd,
                currency: '$',
              })}
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
              {getPrettyAmount({
                value: maxLiquidateUsd,
                currency: '$',
              })}
            </div>
          </div>
        ),
      },
    ],
    [],
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
