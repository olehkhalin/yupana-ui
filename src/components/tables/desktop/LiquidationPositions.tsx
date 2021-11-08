import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyPrice } from 'utils/getPrettyPrice';
import { shortize } from 'utils/getShortize';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';

import s from './Tables.module.sass';

type LiquidationPositionsProps = {
  data: any[]
  className?: string
};

export const LiquidationPositions: React.FC<LiquidationPositionsProps> = ({
  data,
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
            href="/"
            theme="accent"
            action="borrow"
            sizeT="small"
            className={cx(s.address, s.white)}
          >
            {shortize(row.borrowerAddress)}
          </Button>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Total borrowed
          </span>
        ),
        id: 'totalBorrowed',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {getPrettyPrice(row.totalBorrowed)}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Health factor
          </span>
        ),
        id: 'healthFactor',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {row.healthFactor}
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
            {row.borrowedAsset.join(', ')}
          </span>
        ),
      },
      {
        Header: () => (
          <span className={s.blue}>
            Collateral asset
          </span>
        ),
        accessor: 'collateralAsset',
      },
      {
        Header: () => null,
        id: 'liquidate',
        accessor: () => (
          <Button
            theme="light"
            href="/"
            className={s.link}
          >
            Liquidate
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
      rowClassName={s.liquidationRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
