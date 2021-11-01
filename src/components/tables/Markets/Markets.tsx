import React, { useMemo } from 'react';

import { getPrettyPrice } from 'utils/getPrettyPrice';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';

import s from './Markets.module.sass';

type MarketsProps = {
  data: any[]
  className?: string
};

export const Markets: React.FC<MarketsProps> = ({
  data,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={s.white}>
            Market
          </span>
        ),
        id: 'market',
        accessor: (row: any) => (
          <span className={s.white}>
            {row.market}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Total Supply
          </span>
        ),
        id: 'totalSupply',
        accessor: (row: any) => getPrettyPrice(row.totalSupply),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Supply APY
          </span>
        ),
        id: 'supplyApy',
        accessor: (row: any) => `${row.supplyApy}%`,
      },
      {
        Header: () => (
          <span className={s.blue}>
            # of supplier
          </span>
        ),
        accessor: 'numberOfsupplier',
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Total borrow
          </span>
        ),
        id: 'totalBorrow',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {getPrettyPrice(row.totalBorrow)}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Borrow APY
          </span>
        ),
        id: 'borrowApy',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {`${row.borrowApy}%`}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            # of borrowers
          </span>
        ),
        id: 'numberOfBorrowers',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {row.numberOfBorrowers}
          </span>
        ),
      },
      {
        Header: () => null,
        id: 'details',
        accessor: () => (
          <Button
            theme="light"
            href="/"
            className={s.link}
          >
            Details
          </Button>
        ),
      },
    ],
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      type="markets"
      className={className}
    />
  );
};
