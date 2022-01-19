import React, { useMemo } from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { getPrettyPercent } from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { TokenName } from 'components/common/TokenName';
import { AppRoutes } from 'routes/main-routes';

import s from './Tables.module.sass';

type MarketsProps = {
  data: any[]
  loading?: boolean
  className?: string
};

export const Markets: React.FC<MarketsProps> = ({
  data,
  loading,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

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
            href={loading ? '' : `${AppRoutes.MARKETS}/${row.yToken}`}
            theme="tertiary"
            loading={loading}
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
            {loading
              ? row.totalSupply
              : convertPriceByBasicCurrency(row.totalSupply)}
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
            {loading
              ? row.supplyApy
              : getPrettyPercent(row.supplyApy)}
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
            {loading
              ? row.totalBorrow
              : convertPriceByBasicCurrency(row.totalBorrow)}
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
            {loading
              ? row.borrowApy
              : getPrettyPercent(row.borrowApy)}
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
            href={loading ? '' : `${AppRoutes.MARKETS}/${row.yToken}`}
            className={s.link}
          >
            Details
          </Button>
        ),
      },
    ],
    [loading, convertPriceByBasicCurrency],
  );

  return (
    <Table
      theme="tertiary"
      preloaderTheme="quaternary"
      columns={columns}
      data={data}
      loading={loading}
      tableClassName={s.bigTable}
      rowClassName={s.marketsRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
