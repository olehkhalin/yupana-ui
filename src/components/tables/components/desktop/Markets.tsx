import React, { useMemo } from 'react';
import cx from 'classnames';

import { getTokenSlug } from 'utils/getTokenSlug';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { TokenName } from 'components/common/TokenName';
import { AppRoutes } from 'routes/main-routes';

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
        id: 'asset',
        accessor: (row: any) => (
          <TokenName
            token={{ ...row.asset }}
            href={`${AppRoutes.MARKETS}/${getTokenSlug(row.asset)}`}
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
            {`${row.supplyApy}%`}
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
        accessor: (row: any) => (
          <Button
            theme="light"
            sizeT="small"
            href={`${AppRoutes.MARKETS}/${getTokenSlug(row.asset)}`}
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
