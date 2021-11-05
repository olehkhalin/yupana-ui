import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { Table } from 'components/ui/Table';
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';
import { TEZ_TOKEN } from 'components/common/CollateralSwitcher/content';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

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
        id: 'asset',
        accessor: (row: any) => (
          <TokenName
            token={{ ...row.asset }}
          />
        ),
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
          <DropdownArrow
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          />
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
      rowClassName={s.row}
      className={className}
    />
  );
};
