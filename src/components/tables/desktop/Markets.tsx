import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyPrice } from 'utils/getPrettyPrice';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { TokenName } from 'components/common/TokenName';

import s from './Tables.module.sass';

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
          <TokenName
            token={{ ...row.market }}
          />
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Total Supply
          </span>
        ),
        id: 'totalSupply',
        accessor: (row: any) => `$ ${getPrettyPrice(row.totalSupply)}`,
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
        accessor: 'numberOfSupplier',
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
            {`$ ${getPrettyPrice(row.totalBorrow)}`}
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
      theme="tertiary"
      columns={columns}
      data={data}
      tableClassName={s.bigTable}
      rowClassName={s.marketsRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
