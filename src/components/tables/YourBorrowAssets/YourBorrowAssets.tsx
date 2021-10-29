import React, { useMemo } from 'react';

import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { ReactComponent as DropdownArrow } from 'svg/DropdownArrow.svg';

import s from './YourBorrowAssets.module.sass';

type YourBorrowAssetsProps = {
  data: any[]
  className?: string
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
  data,
  className,
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
        Header: 'Balace',
        accessor: 'balance',
      },
      {
        Header: 'Borrow limit',
        accessor: 'borrowLimit',
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
      className={className}
    />
  );
};
