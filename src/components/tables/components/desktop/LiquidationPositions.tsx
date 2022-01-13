import React, { useMemo } from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { AppRoutes } from 'routes/main-routes';
import { getPrettyPercent } from 'utils/helpers/amount';
import { shortize } from 'utils/helpers/token';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { AttentionText } from 'components/common/AttentionText';
import { LIQUIDATABLE_POSITIONS } from 'constants/popups/liquidatable-positions';

import s from './Tables.module.sass';

type LiquidationPositionsProps = {
  data: any[]
  pageCount: number
  pageSize?: number
  setOffset: (arg: number) => void
  className?: string
};

export const LiquidationPositions: React.FC<LiquidationPositionsProps> = ({
  data,
  pageCount,
  setOffset,
  pageSize,
  className,
}) => {
  const { convertPriceByBasicCurrency } = useCurrency();

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
            href={`${AppRoutes.LIQUIDATE}/${row.borrowerAddress}`}
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
            Total borrow
          </span>
        ),
        id: 'totalBorrowed',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {convertPriceByBasicCurrency(row.totalBorrowed)}
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
            {getPrettyPercent(row.healthFactor)}
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
        accessor: (row: any) => (
          <Button
            theme="light"
            href={`${AppRoutes.LIQUIDATE}/${row.borrowerAddress}`}
            className={s.link}
          >
            Liquidate
          </Button>
        ),
      },
    ],
    [convertPriceByBasicCurrency],
  );

  return (
    <Table
      theme="tertiary"
      columns={columns}
      data={data}
      pageCount={pageCount}
      setOffset={setOffset}
      pageSize={pageSize}
      pagination
      tableClassName={s.bigTableLiquidate}
      rowClassName={s.liquidationRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};
