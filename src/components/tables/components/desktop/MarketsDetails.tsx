import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount, getPrettyPercent } from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';

import s from './Tables.module.sass';

type MarketsDetailsProps = {
  data: any[]
  className?: string
};

export const MarketsDetails: React.FC<MarketsDetailsProps> = ({
  data,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={s.blue}>
            Total Supply
          </span>
        ),
        id: 'totalSupply',
        accessor: (row: any) => (
          <span className={s.blue}>
            {getPrettyAmount({ value: row.totalSupply, currency: '$' })}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Supply APY
          </span>
        ),
        id: 'supplyApy',
        accessor: (row: any) => (
          <span className={s.blue}>
            {getPrettyPercent(row.supplyApy)}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            # of supplier
          </span>
        ),
        id: 'numberOfSupplier',
        accessor: (row: any) => (
          <span className={s.blue}>
            {row.numberOfSupplier}
          </span>
        ),
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
            {getPrettyAmount({ value: row.totalBorrow, currency: '$' })}
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
            {getPrettyPercent(row.borrowApy)}
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
    ],
    [],
  );

  return (
    <Table
      theme="tertiary"
      columns={columns}
      data={data}
      tableClassName={s.bigTable}
      rowClassName={s.marketsDetailsRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
