import React, { useMemo } from 'react';

import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { ReactComponent as DropdownArrow } from 'svg/DropdownArrow.svg';

import s from './SupplyAssets.module.sass';

type SupplyAssetsProps = {
  data: any
};

export const SupplyAssets: React.FC<SupplyAssetsProps> = ({
  data,
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
        Header: 'Collateral Factor',
        accessor: 'collateralFactor',
      },
      {
        Header: 'Wallet',
        accessor: 'wallet',
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
    />
  );
};
