import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { Table } from 'components/ui/Table';
import { Button } from 'components/ui/Button';
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';
import { TEZ_TOKEN } from 'components/common/CollateralSwitcher/content';
import { TableDropdown } from 'components/common/TableDropdown';
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
        Cell: () => (
          <CollateralSwitcher token={{ address: TEZ_TOKEN.address }} />
        ),
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <Button
            theme="clear"
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
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
    () => (
      <TableDropdown />
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
