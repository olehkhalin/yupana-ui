import React, { useMemo } from 'react';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { Table } from 'components/ui/Table';
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
  const columns = useMemo(
    () => [
      {
        Header: 'Borrowed asset',
        id: 'borrowedAsset',
        accessor: (row: any) => (
          <TokenName
            token={{ ...row.borrowedAsset }}
          />
        ),
      },
      {
        Header: 'Price of borrowed asset',
        id: 'priceOfBorrowedAsset',
        accessor: ({ priceOfBorrowedAsset }: { priceOfBorrowedAsset: number }) => `${priceOfBorrowedAsset.toFixed(2)}%`,
      },
      {
        Header: 'Amount of debt',
        id: 'amountOfDebt',
        accessor: ({ amountOfDebt, amountOfDebtUsd, borrowedAsset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: amountOfDebt,
                currency: getSliceTokenName(borrowedAsset),
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
        Header: 'MAX Liquidate',
        id: 'maxLiquidate',
        accessor: ({ maxLiquidate, maxLiquidateUsd, borrowedAsset }: any) => (
          <div>
            <div className={s.amount}>
              {getPrettyAmount({
                value: maxLiquidate,
                currency: getSliceTokenName(borrowedAsset),
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
      rowClassName={s.repayRow}
      theadClassName={s.repayThead}
      className={className}
    />
  );
};
