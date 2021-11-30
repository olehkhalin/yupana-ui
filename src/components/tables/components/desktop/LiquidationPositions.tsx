import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { shortize } from 'utils/getShortize';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { AttentionText } from 'components/common/AttentionText';
import { LIQUIDATABLE_POSITIONS } from 'constants/popups/liquidatable-positions';

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
            sizeT="small"
            className={cx(s.address, s.white, s.noShadow)}
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
            {getPrettyAmount({ value: row.totalBorrowed })}
          </span>
        ),
      },
      {
        Header: () => (
          <AttentionText
            text="Health factor"
            theme="secondary"
            title={LIQUIDATABLE_POSITIONS.healthFactor.title}
            description={LIQUIDATABLE_POSITIONS.healthFactor.description}
          />
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
        id: 'collateralAsset',
        accessor: (row: any) => (
          <span className={s.blue}>
            {row.collateralAsset.join(', ')}
          </span>
        ),
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
      pagination
      tableClassName={s.bigTableLiquidate}
      rowClassName={s.liquidationRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
