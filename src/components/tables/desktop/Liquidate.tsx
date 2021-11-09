import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { shortize } from 'utils/getShortize';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { ReactComponent as Attention } from 'svg/Attention.svg';

import s from './Tables.module.sass';

type LiquidateProps = {
  data: any[]
  className?: string
};

export const Liquidate: React.FC<LiquidateProps> = ({
  data,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: () => (
          <span className={s.yellow}>
            Total Borrow
          </span>
        ),
        id: 'totalBorrow',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {getPrettyAmount({ value: row.totalBorrow })}
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
        Header: () => (
          <div className={cx(s.wrapper, s.yellow)}>
            Health factor
            <Button
              theme="clear"
              className={s.attention}
            >
              <Attention className={s.attentionIcon} />
            </Button>
          </div>
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
    ],
    [],
  );

  return (
    <Table
      theme="tertiary"
      columns={columns}
      data={data}
      tableClassName={s.bigTable}
      rowClassName={s.liquidateRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
