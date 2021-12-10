import React, { useMemo } from 'react';
import { Row } from 'react-table';

import { TokenMetadataInterface } from 'types/token';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { Table } from 'components/ui/Table';
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

type YourSupplyAssetsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const YourSupplyAssets: React.FC<YourSupplyAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => (
          <TokenName
            theme="primary"
            token={{ ...row.values.asset }}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Supply APY',
        id: 'supplyApy',
        accessor: ({ supplyApy }: { supplyApy: number | any }) => (
          supplyApy === '-'
            ? supplyApy
            : `${supplyApy.toFixed(2)}%`
        ),
      },
      {
        Header: 'Balance',
        id: 'balance',
        accessor: ({ balance, asset }:{ balance: number | any, asset: TokenMetadataInterface }) => (
          balance === '-'
            ? balance
            : `${balance.toFixed(2)} ${getSliceTokenName(asset)}`
        ),
      },
      {
        Header: 'Collateral',
        id: 'collateral',
        Cell: ({ row }: { row: Row }) => (
          <CollateralSwitcher token={{ address: row.values.asset.address }} />
        ),
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            loading={loading}
            active={row.isExpanded}
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
      rowClassName={s.ownAssetsRow}
      className={className}
    />
  );
};
