import React, { useMemo } from 'react';
import { Row } from 'react-table';
import BigNumber from 'bignumber.js';

import { TokenMetadataInterface } from 'types/token';
import { getSliceTokenName } from 'utils/helpers/token';
import {
  convertUnits,
  getPrettyAmount,
  getPrettyPercent,
} from 'utils/helpers/amount';
import { Table } from 'components/ui/Table';
import { CollateralSwitcher } from 'components/common/CollateralSwitcher';
import { TableDropdown } from 'components/common/TableDropdown';
import { TokenName } from 'components/common/TokenName';
import { DropdownArrow } from 'components/common/DropdownArrow';

import s from './Tables.module.sass';

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
        accessor: ({ supplyApy }: { supplyApy: number }) => (
          getPrettyPercent(supplyApy)
        ),
      },
      {
        Header: 'Balance',
        id: 'balance',
        accessor: (
          { wallet, asset }: { wallet: number | BigNumber, asset: TokenMetadataInterface },
        ) => getPrettyAmount({
          value: convertUnits(wallet, asset.decimals),
          currency: getSliceTokenName(asset),
          dec: asset.decimals,
        }),
      },
      {
        Header: 'Collateral',
        id: 'isCollateral',
        accessor: (row: { isCollateral: boolean, yToken: number }) => ({
          isCollateral: row.isCollateral,
          yToken: row.yToken,
        }),
        Cell: ({ row }: { row: Row }) => (
          <CollateralSwitcher
            isCollateral={row.values.isCollateral.isCollateral}
            yToken={row.values.isCollateral.yToken}
          />
        ),
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
    (row: Row) => (
      <TableDropdown data={row} />
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
