import React, { useMemo } from 'react';
import { Row } from 'react-table';
import cx from 'classnames';

import { TokenMetadataInterface } from 'types/token';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { Table } from 'components/ui/Table';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

type SupplyAssetsProps = {
  data: any[]
  className?: string
};

export const SupplyAssets: React.FC<SupplyAssetsProps> = ({
  data,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset',
        Cell: ({ row }: { row: Row }) => (
          <TokenName
            token={{ ...row.values.asset }}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Supply APY',
        id: 'supplyApy',
        accessor: ({ supplyApy }: { supplyApy: number }) => `${supplyApy.toFixed(2)}%`,
      },
      {
        Header: 'Collateral Factor',
        id: 'collateralFactor',
        accessor: ({ collateralFactor }: { collateralFactor: number }) => `${collateralFactor.toFixed(2)}%`,
      },
      {
        Header: 'Wallet',
        id: 'wallet',
        accessor: ({ collateralFactor, asset }: { collateralFactor: number, asset: TokenMetadataInterface }) => `${collateralFactor} ${getSliceTokenName(asset)}`,
      },
      {
        Header: () => null,
        id: 'expander',
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            active={row.isExpanded}
            className={s.icon}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [],
  );

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
      rowClassName={s.supplyRow}
      className={cx(s.root, className)}
    />
  );
};
