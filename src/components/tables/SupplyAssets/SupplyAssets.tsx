import React, { useMemo } from 'react';
import { Row } from 'react-table';
import cx from 'classnames';

import { Table } from 'components/ui/Table';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './SupplyAssets.module.sass';

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
      className={cx(className, s.root)}
    />
  );
};
