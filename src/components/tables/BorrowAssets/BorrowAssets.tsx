import React, { useMemo } from 'react';

import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { ReactComponent as DropdownArrow } from 'svg/DropdownArrow.svg';

import s from './BorrowAssets.module.sass';

type BorrowAssetsProps = {
  data: any
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
      },
      {
        Header: 'Borrow APY',
        accessor: 'borrowApy',
      },
      {
        Header: 'Utilisation rate',
        accessor: 'utilisationRate',
      },
      {
        Header: 'Liquidity',
        accessor: 'liquidity',
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: () => (
          <Button
            theme="clear"
            className={s.icon}
          >
            <DropdownArrow />
          </Button>
        ),
      },
    ],
    [],
  );

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    [],
  );

  return (
    <Table
      theme="secondary"
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};
