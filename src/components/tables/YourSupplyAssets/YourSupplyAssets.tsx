import React, { useMemo } from 'react';

import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { ReactComponent as DropdownArrow } from 'svg/DropdownArrow.svg';

import s from './YourSupplyAssets.module.sass';

type YourSupplyAssetsProps = {
  data: any[]
  className?: string
};

export const YourSupplyAssets: React.FC<YourSupplyAssetsProps> = ({
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
        Header: 'Supply APY',
        accessor: 'supplyApy',
      },
      {
        Header: 'Balance',
        accessor: 'balance',
      },
      {
        Header: 'Collateral',
        id: 'collateral',
        accessor: () => 'Collateral switcher',
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
      columns={columns}
      data={data}
      renderRowSubComponent={renderRowSubComponent}
      className={className}
    />
  );
};
