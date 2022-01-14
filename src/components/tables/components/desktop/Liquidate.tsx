import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/helpers/amount';
import { shortize } from 'utils/helpers/token';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './Tables.module.sass';

type LiquidateProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const Liquidate: React.FC<LiquidateProps> = ({
  data,
  loading,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={s.white}>
            Borrower address
          </span>
        ),
        id: 'borrowerAddress',
        accessor: (row: any) => (
          <Button
            theme="accent"
            sizeT="small"
            href={loading ? '' : '/'}
            disabled={loading}
            className={cx(s.address, s.white, s.noShadow)}
          >
            {loading ? row.borrowerAddress : shortize(row.borrowerAddress)}
          </Button>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Total Borrow
          </span>
        ),
        id: 'totalBorrow',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {loading ? row.totalBorrow : getPrettyAmount({ value: row.totalBorrow })}
          </span>
        ),
      },
      {
        Header: () => (
          <div className={cx(s.wrapper, s.yellow)}>
            Health factor
            <Button
              theme="clear"
              sizeT="small"
              className={s.attention}
            >
              <Attention className={s.attentionIcon} />
            </Button>
          </div>
        ),
        id: 'healthFactor',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {loading ? row.healthFactor : row.healthFactor}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Borrowed asset
          </span>
        ),
        id: 'borrowedAsset',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {loading ? row.borrowedAsset : row.borrowedAsset.join(', ')}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Collateral asset
          </span>
        ),
        id: 'collateralAsset',
        accessor: (row: any) => (
          <span className={s.blue}>
            {loading ? row.collateralAsset : row.collateralAsset.join(', ')}
          </span>
        ),
      },
    ],
    [loading],
  );

  return (
    <Table
      theme="tertiary"
      preloaderTheme="quinary"
      columns={columns}
      data={data}
      loading={loading}
      tableClassName={s.bigTableLiquidate}
      rowClassName={s.liquidateRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
