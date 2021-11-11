import React, { useMemo } from 'react';

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
        accessor: ({ amountOfDebt }: { amountOfDebt: number }) => `${amountOfDebt.toFixed(2)}%`,
      },
      {
        Header: 'MAX Liquidate',
        id: 'maxLiquidate',
        accessor: ({ maxLiquidate }: { maxLiquidate: number }) => `${maxLiquidate}`,
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
