import React, { useMemo } from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { shortize } from 'utils/helpers/token';
import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { AttentionText } from 'components/common/AttentionText';
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
            theme="accent"
            sizeT="small"
            href={loading ? '' : '/'}
            disabled={loading}
            className={cx(s.address, s.white, s.noShadow)}
          >
            {loading ? '—' : shortize(row.borrowerAddress)}
          </Button>
        ),
      },
      {
        Header: () => (
          <span className={s.yellow}>
            Total Borrow
          </span>
        ),
        id: 'totalBorrowed',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {loading ? '—' : convertPriceByBasicCurrency(row.totalBorrowed)}
          </span>
        ),
      },
      {
        Header: () => (
          <div className={cx(s.wrapper, s.yellow)}>
            <AttentionText
              text="Health factor"
              title="Health factor"
              description="The health factor represents the safety of your loan derived from the proportion of collateral versus amount borrowed. Keep it above 1 to avoid liquidation."
              theme="secondary"
            />
          </div>
        ),
        id: 'healthFactor',
        accessor: (row: any) => (
          <span className={s.yellow}>
            {loading ? '—' : row.healthFactor}
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
            {loading ? '—' : row.borrowedAssetsName.join(', ')}
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
            {loading ? '—' : row.collateralAssetsName.join(', ')}
          </span>
        ),
      },
    ],
    [loading, convertPriceByBasicCurrency],
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
