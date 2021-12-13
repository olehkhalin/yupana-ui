import React, { useMemo } from 'react';
import cx from 'classnames';

import { AppRoutes } from 'routes/main-routes';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { shortize } from 'utils/getShortize';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { AttentionText } from 'components/common/AttentionText';
import { LIQUIDATABLE_POSITIONS } from 'constants/popups/liquidatable-positions';

import s from './Tables.module.sass';

type LiquidationPositionsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const LiquidationPositions: React.FC<LiquidationPositionsProps> = ({
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
            href={loading ? '' : `${AppRoutes.LIQUIDATE}/${row.borrowerAddress}`}
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
            Total borrowed
          </span>
        ),
        id: 'totalBorrowed',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {loading ? row.borrowerAddress : getPrettyAmount({ value: row.totalBorrowed })}
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
            {loading ? row.borrowerAddress : getPrettyPercent(row.healthFactor)}
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
            {loading ? row.borrowerAddress : row.borrowedAsset.join(', ')}
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
            {loading ? row.borrowerAddress : row.collateralAsset.join(', ')}
          </span>
        ),
      },
      {
        Header: () => null,
        id: 'liquidate',
        accessor: (row: any) => (
          <Button
            theme="light"
            href={loading ? '' : `${AppRoutes.LIQUIDATE}/${row.borrowerAddress}`}
            disabled={loading}
            className={s.link}
          >
            Liquidate
          </Button>
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
      pagination
      tableClassName={s.bigTableLiquidate}
      rowClassName={s.liquidationRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
