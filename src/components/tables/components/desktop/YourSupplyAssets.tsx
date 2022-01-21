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
import { SupplyTableDropdown } from 'components/common/TableDropdown';
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
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: 'Supply APY',
        id: 'supplyApy',
        accessor: ({ supplyApy }: { supplyApy: number | any }) => (
          loading
            ? supplyApy
            : getPrettyPercent(supplyApy)
        ),
      },
      {
        Header: 'Wallet',
        id: 'wallet',
        accessor: (
          { wallet, asset }: { wallet: number | BigNumber, asset: TokenMetadataInterface },
        ) => (
          // eslint-disable-next-line no-nested-ternary
          loading
            ? wallet
            : (asset && wallet ? getPrettyAmount({
              value: convertUnits(wallet, asset.decimals),
              currency: getSliceTokenName(asset),
              dec: asset.decimals,
            }) : 0)
        ),
      },
      {
        Header: 'Collateral',
        id: 'isCollateral',
        accessor: (row: { isCollateral: boolean, yToken: number }) => ({
          isCollateral: row.isCollateral,
          yToken: row.yToken,
        }),
        Cell: ({ row }: { row: Row }) => (
          loading
            ? '—'
            : (
              <CollateralSwitcher
                isCollateral={row.values.isCollateral.isCollateral}
                yToken={row.values.isCollateral.yToken}
              />
            )
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
    [loading],
  );

  const renderRowSubComponent = React.useCallback(
    ({
      // @ts-ignore
      row: {
        original: {
          yToken, asset, supplied, wallet, collateralFactor,
        },
      },
    }: Row) => (
      <SupplyTableDropdown
        yToken={yToken}
        asset={asset}
        supplied={supplied}
        wallet={wallet}
        collateralFactor={collateralFactor}
      />
    ),
    [],
  );

  return (
    <Table
      columns={columns}
      data={data}
      isMaxContentPreloader
      renderRowSubComponent={renderRowSubComponent}
      loading={loading}
      rowClassName={s.ownAssetsRow}
      className={className}
    />
  );
};
