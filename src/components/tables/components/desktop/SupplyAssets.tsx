import React, { useMemo } from 'react';
import { Row } from 'react-table';
import cx from 'classnames';

import { AssetsType } from 'containers/Assets';
import { getSliceTokenName } from 'utils/getSliceTokenName';
import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getPrettyPercent } from 'utils/getPrettyPercent';
import { Table } from 'components/ui/Table';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

type SupplyAssetsProps = {
  data: AssetsType[]
  loading: boolean
  className?: string
};

export const SupplyAssets: React.FC<SupplyAssetsProps> = ({
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
        accessor: ({ supplyApy }: AssetsType) => getPrettyPercent(supplyApy),
      },
      {
        Header: 'Collateral Factor',
        id: 'collateralFactor',
        accessor: ({ collateralFactor }: AssetsType) => getPrettyPercent(collateralFactor),
      },
      {
        Header: 'Wallet',
        id: 'wallet',
        accessor: ({ wallet, asset }: AssetsType) => `${getPrettyAmount({ value: wallet, currency: getSliceTokenName(asset), dec: asset.decimals })}`,
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
    [loading],
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
      loading={loading}
      renderRowSubComponent={renderRowSubComponent}
      rowClassName={s.supplyRow}
      className={cx(s.root, className)}
    />
  );
};
